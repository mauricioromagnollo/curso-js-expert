'use strict';

const { watch, promises: { readFile }} = require('fs')

class File {
  watch(event, filename) {
    console.log('this ', this)
    // => A palavra chave 'arguments', pega toda a lista de argumentos que foi passada para a função!
    // Dessa forma, ele vai imprimir um objeto com posição '0' e '1'.
    // console.log('arguments ', arguments) 
    
    // Vamos fazer um .call no prototype do Array, para aproveitar e fazer um exemplo de call e retornar um Array de argumentos
    console.log('arguments ', Array.prototype.slice.call(arguments)) 

    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}


const file = new File()
// dessa forma, ele ignora o 'this' da classe File e herda o this do watch ('fs')!
// watch(__filename, file.watch)

// 1ª Alternativa para não herdar o this da função (FEIO!)
// watch(__filename, (event, filename) => file.watch(event, filename))

// 2ª Alternativa: Deixar explícito qual o contexto que essa função vai ter
// o bind vai substituir o this de dentro dessa função para quando ela for chamada
// o nosso this será a classe file
// o bind retorna uma nova função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

/** .call()
 * 
 * O primeiro argumento de .call é o contexto (this),
 * os próximos argumentos, são os argumentos que a nossa função precisa.
 * 
 * Nesse exemplo, estamos utilizando o null no lugar de event, do file.watch
 * e __filename no lugar de filename.
 * 
 * Nesse exemplo é parecido com o que o Sinon faz por baixo dos panos com os mocks,
 * ele substitui a função de dentro com o mesmo nome, executando uma outra função.
 * Nesse caso, estamos trocando a showContent da classe File por um console.log().
 */

// file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)

/** .apply()
 * 
 * O apply tem o mesmo comportamento do .call, a diferença é que no final ele vai receber um Array de argumentos.
*/
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, [ null, __filename ])


/**
 * Essa função do fs, fica observando as alterações que nós fizemos no nosso arquivo.
 */

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString())
// })