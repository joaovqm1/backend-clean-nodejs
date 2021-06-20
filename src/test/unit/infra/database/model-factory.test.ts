import { Model } from 'sequelize'

import sinon from 'sinon'
import { ModelFactoryImpl } from '@/infra/database/model-factory'
import { FileUtilitiesImpl, StringUtilitiesImpl } from '@/utilities'
import User from '@/infra/database/models/user'

describe('Model Factory', () => {
  const fileUtilities = new FileUtilitiesImpl()
  const stringUtilities = new StringUtilitiesImpl()
  const modelFactory: ModelFactoryImpl = new ModelFactoryImpl(fileUtilities, stringUtilities)

  it('Should get file by similarity', async function() {
    const modelUser: Model = new User()

    sinon.stub(fileUtilities, 'getFilesFromDir')
      .returns(['path.ts'])

    sinon.stub(stringUtilities, 'stringsAreSimilar')
      .withArgs('path', 'model', 0.75)
      .returns(true)

    sinon.stub(modelFactory, 'get')
      .withArgs('path')
      .returns(modelUser)

    expect(modelFactory.getByFileSimilarity('model')).toEqual(modelUser)
  })

  it('Should get file by name', async function() {
    expect(modelFactory.get('user')).toEqual(User)
  })

  it('Should throw an error if model not found', async function() {
    expect(() => modelFactory.get('model'))
      .toThrowError('O model model não foi encontrado')
  })
})

afterEach(() => {
  sinon.restore()
})
