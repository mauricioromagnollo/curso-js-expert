import { Readable, Writable } from 'stream'

// Fonte de dados
const readable = Readable({
  read() {
    this.push('Hello world 1')
    this.push('Hello world 2')
    this.push('Hello world 3')

    // informa que os dados acabaram
    this.push(null)
  }
})

// saída de dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString())

    cb()
  }
})

readable
  // writable é sempre a saída -> imprimir, salvar ou ignorar
  .pipe(writable)
//.pipe(process.stdout) // Lembrando que o stdout é também uma writable stream
