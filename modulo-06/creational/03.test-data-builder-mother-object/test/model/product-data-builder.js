const { Product } = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // o default são os dados corretos, ou caso de sucesso
    this.productData = {
      id: 'valid-id',
      name: 'validname',
      price: 1000,
      category: 'electronic'
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withInvalidId() {
    this.productData.id = '1'
    return this
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this
  }

  withInvalidPrice() {
    this.productData.price = 2000
    return this
  }

  withInvalidCategory() {
    this.productData.category = 'invalid_category'
    return this
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}

module.exports = {
  ProductDataBuilder
}