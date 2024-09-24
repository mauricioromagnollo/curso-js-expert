import { setTimeout } from 'timers/promises'
import { pipeline } from 'stream/promises'

// Async generator 
async function* myCustomReadable() {
  yield Buffer.from('This is my')
  await setTimeout(100)
  yield Buffer.from(' custom readable')
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0
  const wholeString = []

  for await (const chunk of stream) {
    // Parte write do duplex (apenas um console log nesse exemplo)
    console.log(`[duplex writable] ${chunk}`)


    bytesRead += chunk.length
    wholeString.push(chunk)
  }

  // Parte read do duplex
  yield `Total bytes read: ${bytesRead}`
  yield `Whole string: ${wholeString.join()}`
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log(`[writable] ${chunk}`)
  }
}

try {
  const controller = new AbortController()
  // Caso precise cancelar um fluxo
  // controller.abort()

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  )

  console.log('Process has finished!')
} catch (error) {
  console.error('An error has occurred:', error.message)
}



// output do console
/*

[duplex writable] This_is_my
[duplex writable] _custom_readable
[writable] Total bytes read: 26
[writable] Whole string: This_is_my,_custom_readable
Process has finished!

*/