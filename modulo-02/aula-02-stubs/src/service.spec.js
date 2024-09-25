import assert from 'node:assert';
import { createSandbox } from 'sinon';

import { Service } from "./service.js";

import tatooineMock from '../mocks/tatooine.json'  assert { type: 'json' };
import alderaanMock from '../mocks/alderaan.json' assert { type: 'json' };

const BASE_URL_1 = 'https://swapi.dev/api/planets/1'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2'

const sandbox = createSandbox();

// IFEE
; (async () => {
  {
    const service = new Service();

    /* 
    * O trecho está comentado porque dessa forma estamos batendo na API do Star Wars 
    * e o objetivo do teste unitário é n˜ao depender de recursos/conexões externas.
    */

    // const dados = await service.makeRequest(BASE_URL_1);

    const makeRequestStub = sandbox.stub(service, service.makeRequest.name);

    makeRequestStub
      .withArgs(BASE_URL_1)
      .resolves(tatooineMock);

    makeRequestStub
      .withArgs(BASE_URL_2)
      .resolves(alderaanMock);

    {
      const expected = {
        name: 'Tatooine',
        surfaceWater: '1',
        appeardIn: 5
      }

      const result = await service.getPlanets(BASE_URL_1);

      assert.deepStrictEqual(result, expected);
    }

    {
      const expected = {
        name: 'Alderaan',
        surfaceWater: '40',
        appeardIn: 2
      }

      const result = await service.getPlanets(BASE_URL_2);

      assert.deepStrictEqual(result, expected);
    }
  }
})()