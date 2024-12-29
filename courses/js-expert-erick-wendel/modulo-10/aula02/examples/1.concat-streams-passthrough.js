import { Writable, PassThrough } from 'stream'
import axios from 'axios';

const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:4000';

// Trabalhando sob demanda
const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_01,
    responseType: 'stream',
  }),
  axios({
    method: 'get',
    url: API_02,
    responseType: 'stream',
  }),
])

const results = requests.map(({ data }) => data)

const output = new Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, '')
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})

// result[0].pipe(output)
// result[1].pipe(output)

// Concatenando os streams com PassThrough
function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream atual seja fechada
    current.pipe(prev, { end: false })
    // Como colocamos end: false, vamos manipular manualmente quando o nosso current terminar,
    // Quando ele terminar, vamos verificar se todos os outros streams já terminaram no pipeline, se sim, vamos fechar o prev
    // Ele vai então forçar a cadeia do anterior a fechar
    current.on('end', () => items.every(s => s.ended) && prev.end())
    return prev
  }, new PassThrough())
}

const streams =
  merge(results)
    .pipe(output)