import http from 'http';
import { Readable } from 'stream';

function api1(request, response) {
  // response.write('test01\n')
  // response.write('test02\n')
  // response.write('test03\n')

  // request.pipe(response)

  let count = 0
  const maxItems = 99

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          const person = {
            id: Date.now() + count,
            name: `Maurício-${count}`,
          }

          this.push(JSON.stringify(person) + '\n')
          return;
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    },
  })

  // Todo fluxo de dados gerado pelo readable será enviado para o response
  readable.pipe(response)
}

function api2(request, response) {

  let count = 0
  const maxItems = 99
  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          const person = {
            id: Date.now() + count,
            name: `Zézin-${count}`,
          }

          this.push(JSON.stringify(person) + '\n')
          return;
        }

        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    },
  })

  readable.pipe(response)
}

http.createServer(api1).listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
http.createServer(api2).listen(4000, () => console.log('Servidor rodando em http://localhost:4000'));