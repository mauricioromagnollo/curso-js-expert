/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be one of the following: "electronic" or organic
*/

function productValidator(product) {
  const errors = []

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(`id: invalid length, current length: [${product.id.length}] excepted to be between 2 and 20`)
  }

  if (/(\W|\d)/.test(product.name)) {
    errors.push(`name: invalid name, current name: [${product.name}] excepted to be only words`)
  }

  if (!(product.price >= 0 && product.price <= 1000)) {
    errors.push(`price: invalid price, current price: [${product.price}] excepted to be between 0 and 1000`)
  }

  if (!['electronic', 'organic'].includes(product.category)) {
    errors.push(`category: invalid category, current category: [${product.category}] excepted to be one of the following: "electronic" or "organic"`)
  }

  return {
    result: errors.length === 0,
    errors
  }
}

module.exports = {
  productValidator
}