import sinon from 'sinon'

import {
  SequelizeSchemaImpl
} from '@/infra'
import { ModelFactoryImpl, DatabaseApi, User } from '@/infra/database'
import { FileUtilitiesImpl, StringUtilitiesImpl } from '@/utilities'

describe('Database Api', () => {
  const fileUtilities = new FileUtilitiesImpl()
  const stringUtilities = new StringUtilitiesImpl()
  const sequelizeSchema = new SequelizeSchemaImpl()
  const modelFactory = new ModelFactoryImpl(fileUtilities, stringUtilities)
  const databaseApi = new DatabaseApi(modelFactory, sequelizeSchema)

  it('Should return foreign fields from model', async function() {
    const model = new User()
    sinon.stub(modelFactory, 'get')
      .withArgs('user')
      .returns(model)

    sinon.stub(sequelizeSchema, 'getModelFieldsWhichAreForeingKey')
      .withArgs(model)
      .returns(['field'])

    expect(await databaseApi.getModelForeignFields('user')).toEqual(['field'])
  })
})

afterEach(() => {
  sinon.restore()
})
