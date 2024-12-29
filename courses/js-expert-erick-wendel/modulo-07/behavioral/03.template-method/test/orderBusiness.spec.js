import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe.only('Test suite for Template Method design pattern', () => {
  beforeEach(() => jest.restoreAllMocks())

  describe('#OrderBusiness', () => {
    test('execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [
          { description: 'Car' }
        ]
      })

      const orderBusiness = new OrderBusiness()
      // Os devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução
      // Se algum esquecer de chamar a função de validação, pode quebrar o sistema

      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [
          { description: 'Car' }
        ]
      })

      const orderBusiness = new OrderBusiness()
      const calledValidationFn = jest.spyOn(orderBusiness, '_validateRequiredFields')
      const calledCreateFn = jest.spyOn(orderBusiness, '_create')

      // O fluxo de execução é garantido pelo Template Method
      // E evita a replicação de lógica
      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })
})