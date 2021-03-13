import {
  CreateCrudController,
  CrudControllerFacade,
  DeleteCrudController,
  ReadManyCrudController,
  ReadOneCrudController,
  UpdateCrudController
} from '@/presentation'

describe('Presentation - CRUD Controller Facade', function() {
  const createController = new CreateCrudController(undefined, undefined)
  const readOneController = new ReadOneCrudController(undefined, undefined)
  const readManyController = new ReadManyCrudController(undefined, undefined)
  const updateController = new UpdateCrudController(undefined, undefined)
  const deleteController = new DeleteCrudController(undefined)

  const facade = new CrudControllerFacade({
    createController: createController,
    updateController,
    readOneController,
    readManyController,
    deleteController
  })

  it('Should return create controller', function() {
    expect(facade.create()).toEqual(createController)
  })

  it('Should return read one controller', function() {
    expect(facade.read()).toEqual(readOneController)
  })

  it('Should return read many controller', function() {
    expect(facade.readMany()).toEqual(readManyController)
  })

  it('Should return update controller', function() {
    expect(facade.update()).toEqual(updateController)
  })

  it('Should return delete controller', function() {
    expect(facade.delete()).toEqual(updateController)
  })
})
