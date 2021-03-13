/* eslint-disable max-lines */
import { Filter, StringUtilities } from '@/data'
import { Op } from 'sequelize'
import { ModelFactoryImpl } from '../../model-factory'
import { SequelizeSchema } from '../../utilities'
interface IncludesFromForeingField {
  model: any
  field: string
  associatedFields: string[]
}
interface Includes {
  model?: any
  as?: string
  attributes?: string[]
  include?: Includes[]
}

interface QueryParams {
  where?: any
  offset?: number
  limit?: number
  attributes?: string[]
  include?: Includes[]
}

interface Params {
  modelName: string
  sequelizeModel: any
  sequelizeSchema: SequelizeSchema
  modelFactory: ModelFactoryImpl
  stringUtilities: StringUtilities
  currentUser?: any
  userId?: number
  isPublicTable: boolean
  isHybridTable: boolean
  officeIdFieldToQuery?: string
}

export class QueryCreater {
  private readonly modelName: string
  private readonly sequelizeModel: any
  private readonly sequelizeSchema: SequelizeSchema
  private readonly modelFactory: ModelFactoryImpl
  private readonly stringUtilities: StringUtilities
  private readonly userOfficeId?: number
  private readonly isPublicTable: boolean = false
  private readonly isHybridTable: boolean = false
  private readonly officeIdFieldToQuery: string = 'officeId'

  constructor(params: Params) {
    this.modelName = params.modelName
    this.sequelizeModel = params.sequelizeModel
    this.sequelizeSchema = params.sequelizeSchema
    this.modelFactory = params.modelFactory
    this.stringUtilities = params.stringUtilities
    this.userOfficeId = params.userId
    this.isPublicTable = params.isPublicTable
    this.isHybridTable = params.isHybridTable

    if (params.officeIdFieldToQuery)
      this.officeIdFieldToQuery = params.officeIdFieldToQuery
  }

  // eslint-disable-next-line max-lines-per-function
  create(filters: Filter[]): any {
    const query: QueryParams = {}

    let where: any = {}

    if (this.shouldAddOfficeClausure(filters)) {
      where = this.getOfficeClausure()
    }

    if (this.shouldUseOrClausureForOffice(filters)) {
      where[Op.or] = this.getOfficeOrClausureForHybridTables()
    }

    for (const filter of filters) {
      const fieldFilters: any[] = []

      switch (filter.name) {
        case 'equalTo':
          fieldFilters.push(this.createEqualTo(filter))
          break
        case 'greaterThan':
          fieldFilters.push(this.createGreaterThan(filter))
          break
        case 'greaterThanOrEqualTo':
          fieldFilters.push(this.createGreaterThanOrEqualto(filter))
          break
        case 'lessThan':
          fieldFilters.push(this.createLessThan(filter))
          break
        case 'lessThanOrEqualTo':
          fieldFilters.push(this.createLessThanOrEqualTo(filter))
          break
        case 'selectAndInclude': {
          const { attributes, include } = this.createSelectAndIncludes(filter)
          query.attributes = attributes
          query.include = include
          break
        }
        case 'select':
          query.attributes = filter.fields.concat(['id'])
          break
        case 'include':
          query.include = this.getIncludes(filter.fields)
          break
        case 'exists':
          break
      }

      if (fieldFilters.length > 0) {
        where[filter.field] = this.createWhereForFieldFilters(fieldFilters)
      }
    }

    if (this.isWhereNotEmpty(where)) {
      query.where = where
    }

    return query
  }

  shouldAddOfficeClausure(filters: Filter[]): boolean {
    return (
      (this.tableIsNotPublicOrHybrid() && this.modelContainsOfficeId()) ||
      this.filtersContainExistsFilterForOfficeIdField(filters)
    )
  }

  tableIsNotPublicOrHybrid(): boolean {
    return !this.isPublicTable && !this.isHybridTable
  }

  filtersContainExistsFilterForOfficeIdField(filters: Filter[]): boolean {
    return filters.find((filter) => filter.name === 'exists' && filter.field === 'officeId') !== undefined
  }

  getOfficeClausure(): any {
    return {
      [this.officeIdFieldToQuery]: {
        [Op.eq]: this.userOfficeId
      }
    }
  }

  modelContainsOfficeId(): boolean {
    const fields: string[] = this.sequelizeSchema.getModelFields(this.sequelizeModel)
    return fields.includes('officeId')
  }

  shouldUseOrClausureForOffice(filters: Filter[]): boolean {
    return this.isHybridTable && this.filtersDoesntContainExistsFilterForOfficeIdField(filters)
  }

  filtersDoesntContainExistsFilterForOfficeIdField(filters: Filter[]): boolean {
    return filters.find((filter) => filter.name === 'exists' && filter.field === 'officeId') === undefined
  }

  getOfficeOrClausureForHybridTables(): any {
    return [
      { officeId: this.userOfficeId },
      { officeId: null },
    ]
  }

  createEqualTo(filter: Filter): any {
    return { [Op.eq]: filter.value }
  }

  createGreaterThan(filter: Filter): any {
    return this.createFilterAccordingToOperatorAndTypeOfValue(Op.gt, filter.value)
  }

  createFilterAccordingToOperatorAndTypeOfValue(operator: any, value: string | number | Date): any {
    const isDate = typeof value === 'string'
    if (isDate) {
      return { [operator]: new Date(value) }
    } else {
      return { [operator]: value }
    }
  }

  createGreaterThanOrEqualto(filter: Filter): any {
    return this.createFilterAccordingToOperatorAndTypeOfValue(Op.gte, filter.value)
  }

  createLessThan(filter: Filter): any {
    return this.createFilterAccordingToOperatorAndTypeOfValue(Op.lt, filter.value)
  }

  createLessThanOrEqualTo(filter: Filter): any {
    return this.createFilterAccordingToOperatorAndTypeOfValue(Op.lte, filter.value)
  }

  createSelectAndIncludes(filter: Filter): any {
    const fieldsToSelect = this.getOnlyFieldsToSelect(filter.fields)
    const fieldsToInclude = filter.fields.filter(filter => fieldsToSelect.find(fieldToSelect => fieldToSelect !== filter) !== undefined)

    return {
      attributes: fieldsToSelect,
      include: this.getIncludes(fieldsToInclude)
    }
  }

  isWhereNotEmpty(where: any): boolean {
    return where[Op.or] !== undefined || Object.keys(where).length > 0
  }

  createWhereForFieldFilters(filters: any[]): any {
    let where = {}
    for (const filter of filters) {
      where = {
        ...where,
        ...filter
      }
    }

    return where
  }

  getOnlyFieldsToSelect(fieldsToSelectAndInclude: string[]): string[] {
    const foreingFields = this.sequelizeSchema.getModelFieldsWhichAreForeingKey(this.sequelizeModel)

    let fieldsToSelect = fieldsToSelectAndInclude.filter(filter => !filter.includes('.'))
    fieldsToSelect = fieldsToSelect.filter(
      filter => foreingFields.find((foreignField) => foreignField === filter) === undefined
    )

    return fieldsToSelect
  }

  /**
   * This function receives a list of fields like and must return a list of sequelize includes which will be the query's joins 
   * Exemple: 
   * Suppose we are quering in a table called table. This table associates with other two tables called table1 and table2. The table2
   * also associates with another table called table3. 
   * 
   * So let's suppose that we want to query the table1 and include the id from table2 and also the id and name from table3. Then we want to 
   * receive an object like:
   * {
   *  table1: {
   *    id: number
   *    name: string
   *  },
   *  table2: {
   *    id: number,
   *    table3: {
   *      id: number
   *      name: string
   *    }
   *  }
   * }
   * 
   * Then here is the expected input and ouput:
   * Input: ['table1.id', 'table1.name', 'table2.table3.id', 'table2.table3.name', 'table2.id']
   * Output: [{
      model: table1, // name of table1's sequelize name
      as: 'table1', // it is only needed if the relation has a diferent name than model 
      attributes: ['id', 'name'] // attributes we want to select this attributes
   }, 
   {
      model: table2, 
      as: 'table2', 
      attributes: ['id'] // attributes we want to select this attributes from table2
      include: [{ // here we need to include table3 inside table2
        model: table3, 
        as: 'table3', 
        attributes: ['id', 'name']}] // attributes we want to select this attributes from table3
   }]
   * @param fieldsToInclude fields to be include 
   */
  getIncludes(fieldsToInclude: string[]): Includes[] {
    const includesWithCreaterAndUpdater: Includes[] = this.getIncludesWithCreaterAndUpdaterIfNeeded()
    const otherIncludes = this.getIncludesFromModelAccordingToFields(this.sequelizeModel, fieldsToInclude)

    return includesWithCreaterAndUpdater.concat(otherIncludes)
  }

  getIncludesWithCreaterAndUpdaterIfNeeded(): Includes[] {
    const includes: Includes[] = []

    const modelFields = this.sequelizeSchema.getModelFields(this.sequelizeModel)

    const doesModelHasCreater = this.doesFieldsIncludeField(modelFields, 'createrId')
    if (doesModelHasCreater) {
      includes.push(this.getCreaterUpdaterInclude('creater'))
    }

    const doesModelHasUpdater = this.doesFieldsIncludeField(modelFields, 'updaterId')
    if (doesModelHasUpdater) {
      includes.push(this.getCreaterUpdaterInclude('updater'))
    }

    return includes
  }

  doesFieldsIncludeField(fields: string[], field: string): boolean {
    return fields.find((listField) => listField === field) !== undefined
  }

  getCreaterUpdaterInclude(as: string): any {
    return {
      model: this.modelFactory.get('user'),
      as,
      attributes: ['name']
    }
  }

  getIncludesFromModelAccordingToFields(model: any, fieldsToInclude: string[]): Includes[] {
    const includes: Includes[] = []

    for (const fieldToInclude of fieldsToInclude) {
      const foreignField = fieldToInclude.split('.')[0]

      const associatatedModel = this.getAssociatedModel(foreignField, model)

      const fieldNotInclude = includes.find(filter => filter.model === associatatedModel) === undefined
      if (fieldNotInclude) {
        const include = this.getIncludesFromModelAccordingToField({
          field: foreignField,
          model: associatatedModel,
          associatedFields: fieldsToInclude.filter(filter => filter.startsWith(foreignField))
        })

        includes.push(include)
      }
    }

    return includes
  }

  getIncludesFromModelAccordingToField(params: IncludesFromForeingField): Includes {
    const { model, field: foreingField, associatedFields } = params

    let attributesToSelect = this.filterFieldsWithOnlyOneDotAndRemoveForeingFieldFromEachField(associatedFields, foreingField)
    if (attributesToSelect.length === 0) {
      attributesToSelect = this.getModelFields(model)
    }

    const include: Includes = { model, as: foreingField, attributes: attributesToSelect }

    const attributesToSelectAndInclude = this.filterFieldsWithMoreThanOneDotAndRemoveForeingFieldFromEachField(associatedFields, foreingField)

    if (attributesToSelectAndInclude.length > 0) {
      include.include = this.getIncludesFromModelAccordingToFields(model, attributesToSelectAndInclude)
    }

    return include
  }

  filterFieldsWithOnlyOneDotAndRemoveForeingFieldFromEachField(fields: string[], foreignField: string): string[] {
    return fields.filter(filter => (filter.split('.')).length === 2)
      .map(field => field.replace(`${foreignField}.`, ''))
  }

  getModelFields(model: any): string[] {
    const fields = this.sequelizeSchema.getModelFieldsWhichAreNotForeingKey(model)
    const fieldsToDesconsider = ['createdAt', 'updatedAt', 'deletedAt', 'creater', 'updater']

    return fields.filter(filter => !fieldsToDesconsider.includes(filter))
  }

  filterFieldsWithMoreThanOneDotAndRemoveForeingFieldFromEachField(fields: string[], foreignField: string): string[] {
    return fields.filter(filter => (filter.split('.')).length > 2)
      .map(field => field.replace(`${foreignField}.`, ''))
  }

  getAssociatedModel(associationName: string, modelWhichAssociates: any): any {
    try {
      return this.modelFactory.get(associationName)
    } catch (error) {
      const modelProperties: any = this.sequelizeSchema.getModelProperties(modelWhichAssociates)
      const foreingModelName: string = modelProperties[associationName].$ref
        .replace('#/definitions/', '')
        .trim()
        .replace('Model', '')
        .trim()
      return this.modelFactory.get(foreingModelName)
    }
  }
}