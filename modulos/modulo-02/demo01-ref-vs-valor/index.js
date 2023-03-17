const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter
counter2++

// Qual será o valor do counter?
// R: 0
// Nesse caso, o valor foi passado por cópia

const item = { counter: 0 }
const item2 = item
item2.counter++

// O tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// O tipo de referência, copia o endereço de memória
// e aponta para o mesmo lugar
deepStrictEqual(item, { counter: 1 })
deepStrictEqual(item2, { counter: 1 })