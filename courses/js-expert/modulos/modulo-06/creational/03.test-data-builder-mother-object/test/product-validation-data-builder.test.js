const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src/')
const { ProductDataBuilder } = require('./model/product-data-builder')

describe('Test Data Builder', () => {
  it('should return no errors with valid product', () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)
    const expected = { 
      result: true,
      errors: [] 
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build()
      const result = productValidator(product)

      const expected = { 
        result: false,
        errors: [
          "id: invalid length, current length: [1] excepted to be between 2 and 20"
        ] 
      }
  
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)

      const expected = { 
        result: false, 
        errors: [
          "name: invalid name, current name: [abc123] excepted to be only words"
        ] 
      }
  
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)

      const expected = { 
        result: false, 
        errors: [
          "price: invalid price, current price: [2000] excepted to be between 0 and 1000"
        ] 
      }
  
      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
      const result = productValidator(product)

      const expected = { 
        result: false, 
        errors: [
          "category: invalid category, current category: [invalid_category] excepted to be one of the following: \"electronic\" or \"organic\""
        ] 
      }
  
      expect(result).to.be.deep.equal(expected)
    })
  })
})