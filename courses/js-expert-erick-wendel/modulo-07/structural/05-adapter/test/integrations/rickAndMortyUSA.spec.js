import { expect, test, describe, jest, beforeEach } from '@jest/globals'

import fs from 'fs/promises'
import { Character } from '../../src/entities/character.js'
import axios from 'axios'
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.js'

describe('Rick and Morty USA', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharactersXML should return a list of Character Entity', async () => {
    const response = await fs.readFile('./test/mocks/characteres.xml')
    const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toMatchObject(expected)
  })

  test('#getCharactersXML should return an empty list if the API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characteres-empty.xml')
    const expected = []

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toMatchObject(expected)
  })
})