import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.js'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js'

describe('Rick and Morty USA Adapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharacters should be and adapter for RickAndMortyUSA.getCharactersFromXML', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyUSA, 'getCharactersFromXML').mockResolvedValue([])
    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})