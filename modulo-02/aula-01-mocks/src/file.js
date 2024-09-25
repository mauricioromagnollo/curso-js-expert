import { readFile } from 'fs/promises';

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
}

export const error = {
  FILE_LENGTH_ERROR_MESSAGE: 'The content length is invalid!',
  FILE_FIELDS_ERROR_MESSAGE: 'The provided properties are invalid!',
}

export class File {
  static async csvToJson(filePath) {
    const fileContent = await readFile(filePath, 'utf8');
    const fileValidation = File.isValid(fileContent);

    if (!fileValidation.isValid) {
      throw new Error(fileValidation.error);
    }

    const result = File.parseCsvToJson(fileContent);
    return result;
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)

    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        isValid: false
      }
    }

    if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        isValid: false
      }
    }

    return {
      error: null,
      isValid: true
    };
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const headersProperties = firstLine.split(',');

    const users = lines.map(line => {
      const columns = line.split(',');
      const user = {};

      for (const index in columns) {
        user[headersProperties[index]] = columns[index].trim();
      }

      return user;
    })

    return users;
  }
}