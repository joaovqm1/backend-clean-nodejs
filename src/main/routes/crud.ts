import { CrudControllerFacade } from '@/presentation/features/crud/crud-facade'
import { ControllerFactory } from '@/main/factories'

import { Request, Response, Router } from 'express'

// eslint-disable-next-line max-lines-per-function
export default (router: Router): void => {
  router.post('/crud/:entity', async function(req: Request, res: Response) {
    const controller: CrudControllerFacade = await ControllerFactory.get({
      feature: req.params.entity,
      token: req.headers.token as string,
      officeId: +req.headers.officeid,
      operation: 'CREATE',
    })

    const httpResponse = await controller.create().handle(req.body.data)
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data,
    })
  })

  router.put('/crud/:entity/:id', async function(req: Request, res: Response) {
    const controller: CrudControllerFacade = await ControllerFactory.get({
      feature: req.params.entity,
      token: req.headers.token as string,
      officeId: +req.headers.officeid,
      operation: 'UPDATE',
    })

    const httpResponse = await controller.update().handle({
      ...req.body.data,
      id: req.params.id,
    })
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data,
    })
  })

  router.get('/crud/:entity', async function(req: Request, res: Response) {
    const controller: CrudControllerFacade = await ControllerFactory.get({
      feature: req.params.entity,
      token: req.headers.token as string,
      officeId: +req.headers.officeid,
      operation: 'READ',
    })

    const httpResponse = await controller.readMany().handle(req.query)
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data,
    })
  })

  router.get('/crud/:entity/:field/:value', async function(req: Request, res: Response) {
    const controller: CrudControllerFacade = await ControllerFactory.get({
      feature: req.params.entity,
      token: req.headers.token as string,
      officeId: +req.headers.officeid,
      operation: 'READ',
    })

    const query = {
      [req.params.field]: req.params.value,
    }

    const httpResponse = await controller.read().handle(query)
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data,
    })
  })

  router.delete(
    '/crud/:entity/:id',
    async function(req: Request, res: Response) {
      const controller: CrudControllerFacade = await ControllerFactory.get({
        feature: req.params.entity,
        token: req.headers.token as string,
        officeId: +req.headers.officeid,
        operation: 'DELETE',
      })

      const params = {
        entity: req.params.entity,
        id: +req.params.id,
      }

      const httpResponse = await controller.delete().handle(params)
      res.status(httpResponse.statusCode).json({
        data: httpResponse.data,
      })
    }
  )
}
