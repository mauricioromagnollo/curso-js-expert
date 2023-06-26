// import { v4 as uuid } from 'uuid';
import { randomUUID as uuid } from 'crypto';
import Product from '../src/entities/product.js';

export default class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = []
    for (const product of products) {
      const keys = Reflect.ownKeys(product)

      if (!keys.length) continue;

      // O delete é menos performático do que o Reflect.deleteProperty
      // keys.forEach(key => product[key] || delete product[key])

      // O método abaixo é mais performático
      keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
      result.push(new Product(product))

      // Essa forma tem uma péssima performance
      // result.push(JSON.parse(JSON.stringify(new Product(product))))
    }

    return result
  }
}