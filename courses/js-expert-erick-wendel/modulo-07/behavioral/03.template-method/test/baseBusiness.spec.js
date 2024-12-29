import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import { BaseBusiness } from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/utils/errors'

describe('#BaseBusiness', () => {
  beforeEach(() => jest.restoreAllMocks())

  test('should throw error when _validateRequiredFields is not implemented', async () => {
    class ConcreteClass extends BaseBusiness {}
    
    const sut = new ConcreteClass()

    const validationError = new NotImplementedException('_validateRequiredFields')

    expect(() => sut.create({})).toThrow(validationError)
  })

  test('should throw an error when _validateRequiredFields returns false', async () => {
    const VALIDATION_DOESNT_PASS = false
    
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_PASS)
    }
    
    const sut = new ConcreteClass()

    const validationError = new Error('invalid data!')

    expect(() => sut.create({})).toThrow(validationError)
  })

  test('should throw an error when child class doesnt implement _create function', async () => {
    const VALIDATION_PASS = true
    
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_PASS)
    }
    
    const sut = new ConcreteClass()

    const validationError = new NotImplementedException('_create')

    expect(() => sut.create({})).toThrow(validationError)
  })


  test('should call _create and _validateRequiredFields on create', () => {
    const VALIDATION_PASS = true
    const CREATE_SUCCEEDED = true
    
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_PASS)
      _create = jest.fn().mockReturnValue(CREATE_SUCCEEDED)
    }
    
    const sut = new ConcreteClass()
    const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, 'create')


    const result = sut.create({})

    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled()
    expect(sut._create).toHaveBeenCalled()
    expect(sut._validateRequiredFields).toHaveBeenCalled()
  })
})