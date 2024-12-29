import { expect, test, describe, jest, beforeEach } from '@jest/globals'

import fs from 'fs/promises'
import { Character } from '../../src/entities/character.js'
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.js'
import axios from 'axios'

describe('Rick and Morty BRL', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharactersJSON should return a list of Character Entity', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characteres.json'))
    const expected = response.results.map(char => new Character(char))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toEqual(expected)
  })

  test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characteres-empty.json'))
    const expected = response.results.map(char => new Character(char))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toEqual(expected)
  })
})