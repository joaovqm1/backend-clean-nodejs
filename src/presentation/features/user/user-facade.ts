import { CrudControllerFacade } from '@/presentation/features/crud'
import { LoginController } from './login-controller'

export class UserControllerFacade extends CrudControllerFacade {
  constructor(
    readonly crudControllerFacade: CrudControllerFacade,
    private readonly logInController: LoginController
  ) {
    super({
      createController: crudControllerFacade.create(),
      updateController: crudControllerFacade.update(),
      readOneController: crudControllerFacade.read(),
      readManyController: crudControllerFacade.readMany(),
      deleteController: crudControllerFacade.delete(),
    })
  }

  logIn(): LoginController {
    return this.logInController
  }
}
