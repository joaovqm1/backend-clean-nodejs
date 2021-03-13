import { ControllerFactory } from '@/main/factories'

import { Request, Response, Router } from 'express'
import { UserControllerFacade } from '@/presentation/features/user/user-facade'

export default (router: Router): void => {
  router.get('/users/login', async function(req: Request, res: Response) {
    const controller: UserControllerFacade = await ControllerFactory.get({
      feature: 'users',
      operation: 'READ',
    })

    const query = {
      usernameOrEmail: req.query.usernameOrEmail as string,
      password: req.query.password as string,
    }

    const httpResponse = await controller.logIn().handle(query)
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data,
    })
  })
}
