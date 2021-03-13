import { CreateCrudController } from './create-crud-controller'
import { DeleteCrudController } from './delete-crud-controller'
import { ReadOneCrudController } from './read-crud-controller'
import { ReadManyCrudController } from './read-many-crud-controller'
import { UpdateCrudController } from './update-controller'

interface Params {
  createController: CreateCrudController
  updateController: UpdateCrudController
  readOneController: ReadOneCrudController
  readManyController: ReadManyCrudController
  deleteController: DeleteCrudController
}

export class CrudControllerFacade {
  private readonly creteContoller: CreateCrudController
  private readonly updateController: UpdateCrudController
  private readonly readOneContoller: ReadOneCrudController
  private readonly readManyContoller: ReadManyCrudController
  private readonly deleteController: DeleteCrudController

  constructor(params: Params) {
    this.creteContoller = params.createController
    this.updateController = params.updateController
    this.readOneContoller = params.readOneController
    this.readManyContoller = params.readManyController
    this.deleteController = params.deleteController
  }

  create(): CreateCrudController {
    return this.creteContoller
  }

  update(): UpdateCrudController {
    return this.updateController
  }

  read(): ReadOneCrudController {
    return this.readOneContoller
  }

  readMany(): ReadManyCrudController {
    return this.readManyContoller
  }

  delete(): DeleteCrudController {
    return this.deleteController
  }
}
