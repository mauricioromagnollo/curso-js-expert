import { BaseBusiness } from "./base/baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
  #orders = new Set()

  _validateRequiredFields(data) {
    return !!data.amount && !!data.products.length
  }

  _create(order) {
    this.#orders.add(order)
    return true
  }
}
