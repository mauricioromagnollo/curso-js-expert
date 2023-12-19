import { NotImplementedException } from "../../utils/errors.js";

export class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException('_validateRequiredFields')
  }

  _create(data) {
    throw new NotImplementedException('_create')
  }

  /**
   * Padrão do Martin Fowler
   * 
   * A proposta é garantir um fluxo de métodos, definindo uma sequencia a ser executada
   */
  create(data) {
    const isValid = this._validateRequiredFields(data)
    if(!isValid) throw new Error('invalid data!')

    return this._create(data)
  }
}