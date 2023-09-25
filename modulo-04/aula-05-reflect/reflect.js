// Garantir semântica e segurança dos objetos
'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// Function.prototype.apply = () => { throw new TypeError('Eita!')}
assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// esse aqui pode acontecer!
// Pode colocar uma excessão, ou um comportamento que pega os dados e envia para outra função...
myObj.add.apply = function () { throw new TypeError('Vixxx')}

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixxx'
  }
)

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20}, [200])
assert.deepStrictEqual(result, 260)

// ---defineProperty
function MyDate() {}

// feio pra Kct, tudo é Object, mas Object adicionando prop para function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'hey there'})

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'hey dude'})

assert.deepStrictEqual(MyDate.withObject(), 'hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'hey dude')
// ---defineProperty


// ---deleteProperty
const withDelete = { user: 'ErickWendel'}
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'XuxaDaSilva'}
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// ---deleteProperty

// ---get
// Devriamos fazer um get somente em instancias de referencia
// isso não vai estourar nenhuma exceção, só vai retornar undefined. Deveria estourar algo!!
assert.deepStrictEqual(1['userName'], undefined)
// com reflection ele estoura uma exceção
assert.throws(() => Reflect.get(1, 'userName'), TypeError)
// ---get


// ---has
// O operador in verifica se 'superman' existe como chave de objeto
// Mas não é de forma nenhuma semântico, pois parece estar percorrendo uma lista!!
assert.ok('superman' in { superman: ''})

// usando reflect fica mais semântico
assert.ok(Reflect.has({batman: ''}, 'batman'))
// ----has

// ---- ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickwendel'
}

// com os métodos de object, temos que fazer 2 requisições para pegar os Symbols e objetos
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]
assert.deepStrictEqual(objectKeys, [ 'id', Symbol.for('password'), user ])

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [ 'id', Symbol.for('password'), user ])