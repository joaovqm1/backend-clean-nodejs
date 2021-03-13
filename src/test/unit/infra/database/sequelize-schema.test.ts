import {
  SequelizeSchemaImpl
} from '@/infra'

import sequelizeJsonSchema from 'sequelize-json-schema'
import sinon from 'sinon'
describe('Infra - Sequelize schema', () => {
  const sequelizeSchemaImpl = new SequelizeSchemaImpl()
  const model = 'model'

  it('Should get model properties', () => {
    sinon.stub(sequelizeJsonSchema, 'getModelSchema')
      .withArgs(model)
      .returns({ properties: 'properties' })

    expect(sequelizeSchemaImpl.getModelProperties(model)).toEqual('properties')
  })

  it('Should get model required fields', () => {
    sinon.stub(sequelizeJsonSchema, 'getModelSchema')
      .withArgs(model)
      .returns({ required: ['field'] })

    expect(sequelizeSchemaImpl.getModelRequiredFields(model)).toEqual(['field'])
  })

  it('Should get model fields which are foreign keys', () => {
    const properties = {
      Field: {
        items: {
          $ref: 'ref'
        }
      },
      FieldTwo: {
        $ref: 'ref2'
      }
    }
    sinon.stub(sequelizeSchemaImpl, 'getModelProperties')
      .withArgs(model)
      .returns(properties)

    expect(sequelizeSchemaImpl.getModelFieldsWhichAreForeingKey(model)).toEqual(['field', 'fieldtwo'])
  })

  it('Should get model fields which are not foreign keys', () => {
    const properties = {
      Field: {
        items: {
          $ref: 'ref'
        }
      },
      FieldTwo: {
        $ref: 'ref2'
      },
      FieldThree: {

      }
    }
    sinon.stub(sequelizeSchemaImpl, 'getModelProperties')
      .withArgs(model)
      .returns(properties)

    expect(sequelizeSchemaImpl.getModelFieldsWhichAreNotForeingKey(model)).toEqual(['FieldThree'])
  })

  it('Should get the model\'s fields ', () => {
    const properties = {
      Field: {
        items: {
          $ref: 'ref'
        }
      },
      FieldTwo: {
        $ref: 'ref2'
      }
    }
    sinon.stub(sequelizeSchemaImpl, 'getModelProperties')
      .withArgs(model)
      .returns(properties)

    expect(sequelizeSchemaImpl.getModelFields(model)).toEqual(['Field', 'FieldTwo'])
  })
})

afterEach(() => {
  sinon.restore()
})
