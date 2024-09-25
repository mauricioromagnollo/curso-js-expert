import assert from 'node:assert';

import { error } from './src/error.js';
import { File } from './src/file.js';

// IFEE
; (async () => {
  // test file: should not be empty 
  {
    const filePath = './mocks/empty-file.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  // test file: should not be allowed to pass invalid headers 
  {
    const filePath = './mocks/invalid-header-file.csv';
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  // test file: should not be longer than 4 lines including headers 
  {
    const filePath = './mocks/longer-than-4-lines-file.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  // test file: should return a valid JSON object with file content 
  {
    const filePath = './mocks/valid-file.csv';
    const expected = [
      {
        id: 1,
        name: "John Doe",
        profession: "Developer",
        age: 29
      },
      {
        id: 2,
        name: "Jane Smith",
        profession: "Designer",
        age: 34
      },
      {
        id: 3,
        name: "Michael Johnson",
        profession: "Teacher",
        age: 45
      }
    ]
    const result = await File.csvToJson(filePath)
    await assert.deepEqual(result, expected)
  }
})()