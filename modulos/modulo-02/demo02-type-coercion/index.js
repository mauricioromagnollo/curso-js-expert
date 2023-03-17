console.log(true + 2) // 3
console.log(true - 2) // -1
console.log('21' + true) // '21true'
console.log('21' - true) // 20
console.log(9999999999999999) // 10000000000000000
console.log(0.1 + 0.2) //0.30000000000000004
console.log(3 > 2 > 1) // false
console.log('1' == 1) // true
console.log('1' === 1) // false

// Conversão Explícita
console.log(String(123))

// Conversão Implícita
console.log(123 + '')

if (null || 1) {
  // 1 vai ser true
  console.log('ae')
}

// Ele não retorna um boolean, o boolean é feito implicitamente, mas ele retorna o valor!

const arg = 'hello' || 1
console.log(arg) // 'hello'
// o OU sempre vai retornar o primeiro argumento se os dois forem true

const arg2 = 'hello' && 1
console.log(arg2) // 1
// o && sempre vai retornar o último argumento se os dois forem true

// ----------------------

const item = {
  name: 'ErickWendel',
  age: 25,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 1 se não for primitivo, chama o toString
  valueOf() {
    return { hey: 'dude' }
    // return 007
  },
  // Symbol.toPrimite tem prioridade sobre o valueOf e toString
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '0007',
    }

    return types[coercionType] || types.string
  }
}

// console.log('toString = ', String(item))
// console.log('valueOf = ', Number(item))

// Depois de adicionar o toPrimitive
console.log('String = ', String(item))
console.log('Number = ', Number(item))
// Chama a conversão default
console.log('Date = ', new Date(item))

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0')

// A conversão pra boolean já é padrão
console.log('!!item is true?', !!item)
console.assert(!!item === true)

console.assert('ae'.concat(item) === 'ae{"name":"ErickWendel","age":25}')
console.assert(item == String(item))