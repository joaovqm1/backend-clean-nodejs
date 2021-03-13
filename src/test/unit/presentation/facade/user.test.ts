import {
  CreateCrudController,
  CrudControllerFacade,
  DeleteCrudController,
  ReadManyCrudController,
  ReadOneCrudController,
  UpdateCrudController
} from '@/presentation'
import { LoginController } from '@/presentation/features/user/login-controller'
import { UserControllerFacade } from '@/presentation/features/user/user-facade'

describe('Presentation - User Controller Facade', function() {
  const createController = new CreateCrudController(undefined, undefined)
  const readOneController = new ReadOneCrudController(undefined, undefined)
  const readManyController = new ReadManyCrudController(undefined, undefined)
  const updateController = new UpdateCrudController(undefined, undefined)
  const deleteController = new DeleteCrudController(undefined)
  const logInController = new LoginController(undefined)

  const crudFacade = new CrudControllerFacade({
    createController,
    updateController,
    readOneController,
    readManyController,
    deleteController
  })

  const userFacade = new UserControllerFacade(crudFacade, logInController)

  it('Should return create controller', function() {
    expect(crudFacade.create()).toEqual(createController)
  })

  it('Should return read one controller', function() {
    expect(crudFacade.read()).toEqual(readOneController)
  })

  it('Should return read many controller', function() {
    expect(crudFacade.readMany()).toEqual(readManyController)
  })

  it('Should return update controller', function() {
    expect(crudFacade.update()).toEqual(updateController)
  })

  it('Should return delete controller', function() {
    expect(crudFacade.delete()).toEqual(deleteController)
  })

  it('Should return log in controller', function() {
    expect(userFacade.logIn()).toEqual(logInController)
  })
})
