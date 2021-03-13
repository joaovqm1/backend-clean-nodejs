import { ModelFactoryImpl } from '@/infra/database/model-factory'

import { UtilitiesFactory } from './utilities'

export class DataFactory {
  static getModelFactory(): ModelFactoryImpl {
    return new ModelFactoryImpl(
      UtilitiesFactory.getFile(),
      UtilitiesFactory.getString()
    )
  }
}
