import http from 'http'

export async function InjectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit;

  http.Server.prototype.emit = function emit(...args) {
    const [ type, request, response ] = args

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'Maurício Romagnollo')
    }

    return oldEmit.apply(this, args);
  }
}