import { createServer } from 'http';

import Events from 'events'

const myEvent = new Events();

function onData() {
  const items = [];
  setInterval(() => items.push(Date.now()))
}

createServer((req, res) => {
  myEvent.on('data', onData)
  
  myEvent.emit('data', Date.now());
  res.end('Hello world!');
}).listen(3000, () => {
  console.log('Server started');
});

// process.memoryUsage() 