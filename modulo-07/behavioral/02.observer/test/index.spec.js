import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/paymentSubject'
import Payment from '../src/events/payment'
import Shipment from '../src/observers/shipment'
import Marketing from '../src/observers/marketing'

describe('Test suite for Observer', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }

    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)

    subject.notify(data)
    
    expect(observer.update).toBeCalledWith(expected)
  })

  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }

    const data = 'hello world'

    subject.subscribe(observer)
    subject.unsubscribe(observer)

    subject.notify(data)
    
    expect(observer.update).not.toBeCalled()
  })


  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      'notify'
    )

    const data = { userName: 'John Doe', id: Date.now() }

    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
  })

  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(shipment, 'update')
    const marketingSpy = jest.spyOn(marketing, 'update')

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { userName: 'John Doe', id: Date.now() }

    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})