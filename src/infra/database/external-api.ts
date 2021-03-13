import { ModelFactoryImpl } from './model-factory'
import { SequelizeSchema } from './utilities'

export class DatabaseApi {
  constructor(
    private readonly modelFactory: ModelFactoryImpl,
    private readonly sequeliseSchema: SequelizeSchema
  ) {}

  async getModelForeignFields(modelName: string): Promise<string[]> {
    const model = this.modelFactory.get(modelName)
    return this.sequeliseSchema.getModelFieldsWhichAreForeingKey(model)
  }
}
