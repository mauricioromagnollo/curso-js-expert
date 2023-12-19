import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const posgresConnectionString = "postgres://postgres:senha0001@localhost:5432/heroes"
const postgresStrategy = new ContextStrategy(new PostgresStrategy(posgresConnectionString))
await postgresStrategy.connect()

const mongoDBConnectionString = "mongodb://mongodb:senha0001@localhost:27017/heroes"
const mongoDBStrategy = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBStrategy.connect()

const data = [{
  name: 'John',
  type: 'transaction'
}, {
  name: 'Joana',
  type: 'activityLog'
}]

const contextTypes = {
  transaction: postgresStrategy,
  activityLog: mongoDBStrategy
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })
  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}