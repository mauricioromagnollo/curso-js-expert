export default class PaymentSubject {
  #observers = new Set()

  notify(data) {
    // Notificar todo mundo que está inscrito

    this.#observers.forEach(observer => observer.update(data))
  }

  unsubscribe(observable) {
    // Remover todo mundo que pediu para se inscrever

    this.#observers.delete(observable)
  }

  subscribe(observable) {
    // Guardar todo mundo que pediu para se inscrever

    this.#observers.add(observable)
  }
}