import {
  SequelizeSchemaImpl
} from '@/infra'
import { StringUtilitiesImpl } from '@/utilities'
import { DataFactory } from '@/main/factories/data'
import { Filter } from '@/data/contracts'
import { Op } from 'sequelize'

import AnySequelizeModel from '@/infra/database/models/user'

import sinon from 'sinon'
import { QueryCreater } from '@/infra/database/api/read/query'
import UserModel from '@/infra/database/models/user'
import OfficeModel from '@/infra/database/models/office'
import CityModel from '@/infra/database/models/city'
import StateModel from '@/infra/database/models/state'
import DocumentModel from '@/infra/database/models/document'

describe('Infra  - Query Creater', () => {
  const sequelizeSchema = new SequelizeSchemaImpl()
  const modelFactory = DataFactory.getModelFactory()
  const stringUtilities = new StringUtilitiesImpl()

  const params = {
    modelName: 'user',
    sequelizeModel: AnySequelizeModel,
    sequelizeSchema: sequelizeSchema,
    modelFactory: modelFactory,
    stringUtilities,
    currentUser: undefined,
    userId: 1,
    isHybridTable: false,
    isPublicTable: false,
    officeIdFieldToQuery: 'officeId'
  }

  const queryCreator = new QueryCreater(params)

  const filters: Filter[] = [{
    name: 'equalTo',
    field: 'field',
    value: 'value'
  }]

  const createrUpdaterIncludes = [
    { model: AnySequelizeModel, as: 'creater', attributes: ['name'] },
    { model: AnySequelizeModel, as: 'updater', attributes: ['name'] }
  ]

  it('Should return true when its not public or hybrid table and model contains officeId', () => {
    // Arrange 
    sinon.stub(queryCreator, 'modelContainsOfficeId')
      .returns(true)

    // Act and assert
    expect(queryCreator.shouldAddOfficeClausure([])).toEqual(true)
  })

  it('Should return true when its hybrid table, model doesn\'t officeId but there is a exists filter for officeId', () => {
    // Arrange
    const filters: Filter[] = [{
      name: 'exists',
      field: 'officeId',
      value: 'value'
    }]

    const queryCreator = new QueryCreater({
      ...params,
      isHybridTable: true
    })

    sinon.stub(queryCreator, 'modelContainsOfficeId')
      .returns(false)

    // Act and assert
    expect(queryCreator.shouldAddOfficeClausure(filters)).toEqual(true)
  })

  it('Should return office clausure', function() {
    // Act
    const receivedOfficeClausure = queryCreator.getOfficeClausure()

    // Assert 
    const expectedOfficeClausure = {
      officeId: {
        [Op.eq]: 1
      }
    }
    expect(expectedOfficeClausure).toEqual(receivedOfficeClausure)

  })

  it('Should return true when model contains officeId field', function() {
    // Assert 
    sinon.stub(sequelizeSchema, 'getModelFields').withArgs(AnySequelizeModel).returns(['officeId'])

    // Act and assert 
    expect(queryCreator.modelContainsOfficeId()).toBe(true)
  })

  it('Should return true when table is hybrid and there is no exists officeId filter', () => {
    // Arrange
    const queryCreator = new QueryCreater({
      ...params,
      isHybridTable: true
    })

    const filters: Filter[] = [{
      name: 'exists',
      field: 'otherField'
    }]

    // Act and assert 
    expect(queryCreator.shouldUseOrClausureForOffice(filters)).toEqual(true)
  })

  it('Should return office or clausure for hybrid table', function() {
    // Act
    const receivedOrClaure = queryCreator.getOfficeOrClausureForHybridTables()

    // Assert 
    const exptedOrClausure = [
      { officeId: 1 },
      { officeId: null },
    ]
    expect(exptedOrClausure).toEqual(receivedOrClaure)
  })

  it('Should return true if where is not empty', function() {
    // Arrange 
    const where = {
      foo: 'bar'
    }

    // Act and assert
    expect(queryCreator.isWhereNotEmpty(where)).toEqual(true)
  })

  it('Should create where from field filters', function() {
    // Act
    const filters = [{
      [Op.eq]: 'name'
    }, {
      [Op.gt]: 18
    }]

    // Act
    const receivedWhere = queryCreator.createWhereForFieldFilters(filters)

    // Assert 
    const expectedWhere = {
      [Op.eq]: 'name',
      [Op.gt]: 18
    }
    expect(expectedWhere).toEqual(receivedWhere)
  })

  it('Should return only fields to select when pass a list with a field to select and other one to include', () => {
    // Arrange
    const fieldsToSelectAndInclude = ['fieldToSelect', 'fieldToInclude']
    const fieldsToSelect = ['fieldToSelect']
    const fieldsToInclude = ['fieldToInclude']

    sinon.stub(sequelizeSchema, 'getModelFieldsWhichAreForeingKey')
      .withArgs(AnySequelizeModel)
      .returns(fieldsToInclude)

    // Act and assert
    expect(queryCreator.getOnlyFieldsToSelect(fieldsToSelectAndInclude)).toEqual(fieldsToSelect)
  })

  it('Should return only fields to select when pass a list with a field to select and other others fields with . to include', () => {
    // Arrange
    const fieldsToSelectAndInclude = ['fieldToSelect', 'fieldToInclude.attribute1', 'fieldToInclude.attribute2']
    const fieldsToSelect = ['fieldToSelect']
    const fieldsToInclude = ['fieldsToInclude']

    sinon.stub(sequelizeSchema, 'getModelFieldsWhichAreForeingKey')
      .withArgs(AnySequelizeModel)
      .returns(fieldsToInclude)

    // Act and assert
    expect(queryCreator.getOnlyFieldsToSelect(fieldsToSelectAndInclude)).toEqual(fieldsToSelect)
  })

  it('Should create query with officeId clausure', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .withArgs([])
      .returns(true)

    const officeIdClausure = { 'officeId': { [Op.eq]: 1 } }

    sinon.stub(queryCreator, 'getOfficeClausure')
      .returns(officeIdClausure)

    // Act 
    const receivedQuery = queryCreator.create([])

    // Assert 
    const exptedQuery = {
      where: officeIdClausure
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with OR officeId clausure', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .withArgs([])
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .withArgs([])
      .returns(true)

    const orOfficeIdClausure = [
      { officeId: 1 },
      { officeId: null }
    ]

    sinon.stub(queryCreator, 'getOfficeOrClausureForHybridTables')
      .returns(orOfficeIdClausure)

    // Act 
    const receivedQuery = queryCreator.create([])

    // Assert 
    const exptedQuery = {
      where: {
        [Op.or]: orOfficeIdClausure
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with equalTo', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filters: Filter[] = [{
      name: 'equalTo',
      field: 'field',
      value: 'value'
    }]

    // Act 
    const receivedQuery = queryCreator.create(filters)

    // Assert 
    const exptedQuery = {
      where: {
        field: {
          [Op.eq]: 'value'
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with equalTo', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filters: Filter[] = [{
      name: 'equalTo',
      field: 'field',
      value: 'value'
    }]

    // Act 
    const receivedQuery = queryCreator.create(filters)

    // Assert 
    const exptedQuery = {
      where: {
        field: {
          [Op.eq]: 'value'
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with greaterThan for date', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'greaterThan',
      field: 'field',
      value: '2021-02-23'
    }

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      where: {
        [filter.field]: {
          [Op.gt]: new Date(filter.value)
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with greaterThanOrEqualTo for number', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'greaterThanOrEqualTo',
      field: 'field',
      value: 500
    }

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      where: {
        [filter.field]: {
          [Op.gte]: filter.value
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with lessThan', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'lessThan',
      field: 'field',
      value: 500
    }

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      where: {
        [filter.field]: {
          [Op.lt]: filter.value
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with lessThanOrEqualTo', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'lessThanOrEqualTo',
      field: 'field',
      value: 500
    }

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      where: {
        [filter.field]: {
          [Op.lte]: filter.value
        }
      }
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with selectAndInclude', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'selectAndInclude',
      fields: [
        'fieldToSelect',
        'fieldToInclude.attribute'
      ]
    }

    const attributes = ['fieldToSelect']

    const include = {
      model: AnySequelizeModel,
      attributes: ['attribute']
    }

    sinon.stub(queryCreator, 'getOnlyFieldsToSelect').withArgs(filter.fields).returns(attributes)
    sinon.stub(queryCreator, 'getIncludes').withArgs(['fieldToInclude.attribute']).returns([include])

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      attributes,
      include: [include]
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with select', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'select',
      fields: [
        'fieldToSelect'
      ]
    }

    const attributes = ['fieldToSelect']

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      attributes: attributes.concat(['id'])
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should create query with include', () => {
    // Arrange 
    sinon.stub(queryCreator, 'shouldAddOfficeClausure')
      .returns(false)

    sinon.stub(queryCreator, 'shouldUseOrClausureForOffice')
      .returns(false)

    const filter: Filter = {
      name: 'include',
      fields: [
        'fieldToInclude.attribute'
      ]
    }

    const include = {
      model: AnySequelizeModel,
      attributes: ['attribute']
    }

    sinon.stub(queryCreator, 'getIncludes').withArgs(filter.fields).returns([include])

    // Act 
    const receivedQuery = queryCreator.create([filter])

    // Assert 
    const exptedQuery = {
      include: [include]
    }
    expect(exptedQuery).toEqual(receivedQuery)
  })

  it('Should call includes from fields received as argument, creater, updater and return the combination of them ', function() {
    // Arrange
    const otherIncludes = [{
      model: OfficeModel,
      attributes: ['id', 'name'],
      as: 'office'
    }]

    const fieldsToInclude = [
      'office.id',
      'office.name'
    ]

    sinon.stub(queryCreator, 'getIncludesWithCreaterAndUpdaterIfNeeded').withArgs().returns(createrUpdaterIncludes)
    sinon.stub(queryCreator, 'getIncludesFromModelAccordingToFields').withArgs(AnySequelizeModel, fieldsToInclude).returns(otherIncludes)

    // Act 
    const receivedIncludes = queryCreator.getIncludes(fieldsToInclude)

    // Assert 
    const expectedIncludes = createrUpdaterIncludes.concat(otherIncludes)
    expect(expectedIncludes).toEqual(receivedIncludes)
  })

  it('Should return includes with creater and updater', function() {
    // Arrange 
    sinon.stub(sequelizeSchema, 'getModelFields').withArgs(AnySequelizeModel).returns(['createrId', 'updaterId'])

    // Act
    const receivedIncludes = queryCreator.getIncludesWithCreaterAndUpdaterIfNeeded()

    // Assert 
    const exptedIncludes = createrUpdaterIncludes
    expect(exptedIncludes).toEqual(receivedIncludes)
  })

  it('Should return includes office, office state, office city from barrel model', function() {
    // Arrange
    const fieldsToInclude = [
      'office.id',
      'office.name',
      'office.city.id',
      'office.city.name',
      'office.state.id',
      'office.state.name',
    ]

    const getAssociatedModelStub = sinon.stub(queryCreator, 'getAssociatedModel')
    getAssociatedModelStub.withArgs('office', UserModel).returns(OfficeModel)
    getAssociatedModelStub.withArgs('city', OfficeModel).returns(CityModel)
    getAssociatedModelStub.withArgs('state', OfficeModel).returns(StateModel)

    // Act 
    const receivedIncludes = queryCreator.getIncludesFromModelAccordingToFields(UserModel, fieldsToInclude)

    // Assert
    const expectedIncludes = [{
      model: OfficeModel,
      attributes: ['id', 'name'],
      as: 'office',
      include: [{
        model: CityModel,
        as: 'city',
        attributes: ['id', 'name']
      }, {
        model: StateModel,
        as: 'state',
        attributes: ['id', 'name']
      }]
    }]

    expect(expectedIncludes).toEqual(receivedIncludes)
  })

  it('Should return includes office and all its attributes from user model', function() {
    // Arrange
    const fieldsToInclude = [
      'office',
    ]

    const getAssociatedModelStub = sinon.stub(queryCreator, 'getAssociatedModel')
    getAssociatedModelStub.withArgs('office', UserModel).returns(OfficeModel)

    const officeAttributes = [
      'id',
      'name'
    ]

    sinon.stub(sequelizeSchema, 'getModelFieldsWhichAreNotForeingKey').withArgs(OfficeModel).returns(officeAttributes)

    // Act 
    const receivedIncludes = queryCreator.getIncludesFromModelAccordingToFields(UserModel, fieldsToInclude)

    // Assert
    const expectedIncludes = [{
      model: OfficeModel,
      attributes: officeAttributes.filter(
        filter => !filter.includes('createdAt') && !filter.includes('updatedAt') && !filter.includes('deletedAt')
      ),
      as: 'office'
    }]

    expect(expectedIncludes).toEqual(receivedIncludes)
  })

  it('Should return fields with only one dot and remove foreing field from each string', function() {
    // Arrange 
    const fields = ['foreingField.field1', 'foreingField.field2.id', 'foreingField.field3.field4.id']

    // Act 
    const receivedFieldsWithOneDot = queryCreator.filterFieldsWithOnlyOneDotAndRemoveForeingFieldFromEachField(fields, 'foreingField')

    // Assert 
    const expectedFieldsWithOneDot = ['field1']
    expect(expectedFieldsWithOneDot).toEqual(receivedFieldsWithOneDot)
  })

  it('Should return fields with more than one dot', function() {
    // Arrange 
    const fields = ['field1', 'field2.id', 'field3.field4.id']

    // Act 
    const receivedFieldsWithMoreThanOneDot = queryCreator.filterFieldsWithMoreThanOneDotAndRemoveForeingFieldFromEachField(fields, 'field3')

    // Assert 
    const expectedFieldsWithMoreThanOneDot = ['field4.id']
    expect(expectedFieldsWithMoreThanOneDot).toEqual(receivedFieldsWithMoreThanOneDot)
  })

  it('Should return true if fields include field', () => {
    expect(queryCreator.doesFieldsIncludeField(['field'], 'field')).toEqual(true)
  })

  it('Should return associated model found by field name', function() {
    // Arrange 
    sinon.stub(modelFactory, 'get').withArgs('office').returns(OfficeModel)

    // Act
    const receivedModel = queryCreator.getAssociatedModel('office', UserModel)

    // Assert 
    const exptedModel = OfficeModel
    expect(exptedModel).toEqual(receivedModel)
  })

  it('Should return associated model found by association name', function() {
    // Arrange 
    const getModelStub = sinon.stub(modelFactory, 'get')
    getModelStub.withArgs('creater').throws(new Error('Error'))

    sinon.stub(sequelizeSchema, 'getModelProperties').withArgs(DocumentModel).returns({
      creater: { '$ref': '#/definitions/UserModel' }
    })
    getModelStub.withArgs('User').returns(UserModel)

    // Act
    const receivedModel = queryCreator.getAssociatedModel('creater', DocumentModel)

    // Assert 
    const expectedModel = UserModel
    expect(expectedModel).toEqual(receivedModel)
  })
})

afterEach(() => {
  sinon.restore()
})
