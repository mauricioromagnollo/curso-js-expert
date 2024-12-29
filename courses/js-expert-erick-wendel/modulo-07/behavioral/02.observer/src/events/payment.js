export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject
  }

  creditCard(paymentData) {
    console.log(`Payment ocurred from ${paymentData.userName}`)

    // ... regras de negócio
    
    this.paymentSubject.notify(paymentData)
  }
}