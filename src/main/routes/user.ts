import { Request, Response, Router } from 'express'

import { routeRunner } from '../runner'

export default (router: Router): void => {
  router.get('/users/login', async function(req: Request, res: Response) {
    return routeRunner({
      feature: 'users',
      operation: 'LOGIN',
      queryOrBody: req.query,
      req,
      res,
      useCase: { name: 'logIn' }
    })
  })

  router.put('/users/password/email', async function(req: Request, res: Response) {
    return routeRunner({
      feature: 'users',
      operation: 'RECOVER-PASSWORD',
      queryOrBody: req.body.data,
      req,
      res,
      useCase: { name: 'sendPasswordRecoveryEmail', function: 'send' }
    })
  })

  router.put('/users/password/change', async function(req: Request, res: Response) {
    return routeRunner({
      feature: 'users',
      operation: 'CHANGE-PASSWORD',
      queryOrBody: req.body.data,
      req,
      res,
      useCase: { name: 'changePassword', function: 'change' }
    })
  })
}
