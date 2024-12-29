import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

// Fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e3; index++) {
      const person = {
        id: Date.now() + index,
        name: `John Doe ${index}`
      }

      const data = JSON.stringify(person)
      this.push(data)
    }

    // informa que os dados acabaram
    this.push(null)
  }
})

// Processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}`

    cb(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter += 1
    cb(null, 'id,name\n'.concat(chunk))
  }
})

// saída de dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString())

    cb()
  }
})

// Esteira de stream

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable)
  .pipe(createWriteStream('my.csv'))

pipeline
  .on('end', () => console.log('acabou'))