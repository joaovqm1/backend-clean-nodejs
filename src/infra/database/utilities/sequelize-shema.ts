import sequelizeJsonSchema from 'sequelize-json-schema'

export interface SequelizeSchema {
  getModelProperties: (model: any) => any
  getModelRequiredFields: (model: any) => string[]
  getModelFieldsWhichAreForeingKey: (model: any) => string[]
  getModelFieldsWhichAreNotForeingKey: (model: any) => string[]
  getModelFields: (model: any) => string[]
}

export class SequelizeSchemaImpl implements SequelizeSchema {
  getModelProperties(model: any): any {
    return sequelizeJsonSchema.getModelSchema(model).properties
  }

  getModelRequiredFields(model: any): string[] {
    return sequelizeJsonSchema.getModelSchema(model).required
  }

  getModelFieldsWhichAreForeingKey(model: any): string[] {
    const properties = this.getModelProperties(model)

    const fields: string[] = []

    for (const field in properties) {
      // eslint-disable-next-line security/detect-object-injection
      if (properties[field].items?.$ref || properties[field].$ref) {
        fields.push(field.toLowerCase())
      }
    }

    return fields
  }

  getModelFieldsWhichAreNotForeingKey(model: any): string[] {
    const properties = this.getModelProperties(model)

    const fields: string[] = []

    for (const field in properties) {
      // eslint-disable-next-line security/detect-object-injection
      const isForeignKey = properties[field].items?.$ref || properties[field].$ref
      if (isForeignKey) {
        continue
      } else {
        fields.push(field)
      }
    }

    return fields
  }

  getModelFields(model: any): string[] {
    const properties = this.getModelProperties(model)

    const fields: string[] = []

    for (const field in properties) {
      fields.push(field)
    }

    return fields
  }
}
