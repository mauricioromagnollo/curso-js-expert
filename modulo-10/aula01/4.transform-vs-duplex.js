import { Duplex, Transform } from 'stream';

// O socket é uma duplex stream

let count = 0

const server = new Duplex({
  objectMode: true, // Faz não precisar trabalhar com buffer, mas gasta mais memória
  encoding: 'utf-8',

  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Maurício [${count}]`)
        return;
      }

      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(function () { everySecond(this) })
  },

  // É como se fosse um objeto completamente diferente

  write(chunk, encoding, cb) {
    console.log(`[writable] ${chunk}`)
    cb()
  }
})

// Provar que o read e o write são canais de comunicação diferentes
// O write é um canal de comunicação diferente do read, aciona o writable do duplex
server.write('[duplex] hey this is a writable!\n')
// on data -> loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable] ${msg}`))

// o push deixa você enviar mais dados para o readable (mesmo tendo o push(null) lá dentro)
server.push(`[duplex] hey this is also a readable!\n`)

// server
//   .pipe(process.stdout)

const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// O transform é também um duplex, mas não possuem comunicação independente
transformToUpperCase.write('[transform] hello from write!')
// O push vai ignorar o que vc tem na função transform
transformToUpperCase.push('[transform] hello from push\n')

server
  .pipe(transformToUpperCase)
  .pipe(server) // Duplex é um stream que pode ser lido e escrito ao mesmo tempo
// Redireciona todos os dados de readable para writable da duplex