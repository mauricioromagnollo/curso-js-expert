import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminal-controller.js'
import { save } from './repository.js'

const DEFAULT_LANG = 'pt-BR'
const QUIT_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()

    if (answer === QUIT_TERMINAL) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)

    return mainLoop()
  } catch (error) {
    console.error(error)
    return mainLoop()
  }
}

await mainLoop()