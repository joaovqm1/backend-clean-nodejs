import { FileUtilities, StringUtilities } from '@/data/contracts'
import { ModelNotFoundError } from '@/domain'

export class ModelFactoryImpl {
  constructor(
    private readonly fileUtilities: FileUtilities,
    private readonly stringUtilities: StringUtilities
  ) { }

  get(nameModel = ''): any {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Model = require(`@/infra/database/models/${nameModel.toLowerCase()}`)
      return Model.default
    } catch (error) {
      return this.getByFileSimilarity(nameModel)
    }
  }

  getByFileSimilarity(modelName: string): any {
    const files = this.fileUtilities.getFilesFromDir(`${__dirname}/models`)
    for (const file of files) {
      const filename = file.replace('.ts', '')
      if (this.stringUtilities.stringsAreSimilar(filename, modelName, 0.75)) {
        return this.get(filename)
      }
    }
    throw new ModelNotFoundError(`O model ${modelName} não foi encontrado`)
  }
}
