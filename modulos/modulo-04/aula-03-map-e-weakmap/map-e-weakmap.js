const assert = require('assert')

const myMap = new Map()

// A chave do map pode ser qualquer coisa!
myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello')

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// usando um constructor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// Em objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1}
myMap.set(onlyReferenceWorks, { name: 'ErickWendel '})

// Só funciona por referência, ou seja, passando o endereço de memória do objeto
// no caso, a variável
assert.deepStrictEqual(myMap.get({id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel '})

// utilitários
// - No object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// Para verificar se um item existe no Object
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Erick'}).hasOwnProperty('name')

// no map podemos utilizar o .has()
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// mas é completamente imperformático no JavaScript

// no map nós temos o .delete()
assert.ok(myMap.delete(onlyReferenceWorks))

// Não para iterar em Objects diretamente
// tem que transformar o Object.entries()

// no map ele já implementa o padrão do generator
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Erick",{"text":"two"}],[true, () => {}]]))

// for (const [key, value] of myMap) {
//   console.log(key, value)
// }

// O Object é inseguro, porque dependendo do nome da chave nós podemos substituir algum comportamento
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey}).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como constructor, toString, valueOf e etc...

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// No objeto não dá para limpar sem reassina-lo
// no map, nós temos o .clear()

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ---weakmap
// Pode ser coletado após perder as referências (Auxilia na limpeza de memória)
// usado em casos beem espeecíficos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referências e que você já conheça
// mais leve e preve leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakmap = new WeakMap()
const hero = { name: 'Flash'}

// É basicamente só isso que existe no WeakMap

// weakmap.set(hero)
// weakmap.get(hero)
// weakmap.delete(hero)
// weakmap.has(hero)