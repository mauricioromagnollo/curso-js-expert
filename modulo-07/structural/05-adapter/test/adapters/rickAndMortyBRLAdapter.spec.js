import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.js'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'

describe('Rick and Morty BRL Adapter', () => {
  beforeEach(() => jest.clearAllMocks())

  test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyBRL, 'getCharactersFromJSON').mockResolvedValue([])
    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})