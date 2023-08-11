// import { v4 as uuid } from 'uuid';
import { randomUUID as uuid } from 'crypto';
import Product from '../src/entities/product.js';

export default class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map(product => new Product(product))
    
    return JSON.parse(JSON.stringify(productsEntities)) 
  }
}

/**
 * The benchmark results are:
 * Cart#rmEmptyPropMapReduce x 441,783 ops/sec ±3.72% (84 runs sampled)
 * Cart#rmEmptyPropFor x 472,967 ops/sec ±3.46% (83 runs sampled)
    Fastest is Cart#rmEmptyPropFor
 */