'use strict';

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, {newValue, key: target[propertyKey]})
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    // console.log('chamou!', { object, prop})
    return object[prop]
  }
})

setInterval(function() {
  proxy.counter += 1
  console.log('[3]: interval!')
  if(proxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: timeout!')
}, 100)

// se eu quero executar imediatamente, deve-se utilizar a função setImediate ao inves de setInterval
setImmediate(() => {
  console.log('[1]: setImediate', proxy.counter)
})

// executa agora, agorinha, mas acaba com o ciclo de vida do node
// Vai ter preferência e entrar na frente na pilha do Node.js
// Percebe que agora o contador vai começar de 2
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})

/**
setTimeout -> Sempre no futuro a execução
setInterval -> Vai executar depende do que estiver junto com ele ou parâmetro passado, mas ficará executando para sempre
setImediate -> Irá executar imediatamente
nextTick -> Tem prioridade na pilha do JavaScript, então será executado primeiro
 */