/* eslint-disable security/detect-object-injection */
import { Request, Response, Router } from 'express'
import multer from 'multer'

import { routeRunner } from '../runner'

const upload = multer({ dest: 'uploads/' })

// eslint-disable-next-line max-lines-per-function
export default (router: Router): void => {
  router.post('/crud/:entity', upload.single('file'), async function(req: Request, res: Response) {
    let data = req.body.data
    if (req.file) {
      data = getDataWithFile(req)
    }

    return routeRunner({
      feature: req.params.entity,
      operation: 'CREATE',
      queryOrBody: data,
      req,
      res,
      useCase: { name: 'create' }
    })
  })

  function getDataWithFile(req: Request): any {
    const body = {}

    for (const field in req.body) {
      try {
        body[field] = JSON.parse(req.body[field])
      } catch (error) {
        body[field] = req.body[field]
      }
    }

    return {
      ...body,
      file: req.file
    }
  }

  router.put('/crud/:entity/:id', upload.single('file'), async function(req: Request, res: Response) {
    let data = req.body.data
    if (req.file) {
      data = getDataWithFile(req)
    }

    return routeRunner({
      feature: req.params.entity,
      operation: 'UPDATE',
      queryOrBody: { ...data, id: req.params.id },
      req,
      res,
      useCase: { name: 'update' }
    })
  })

  router.get('/crud/:entity', async function(req: Request, res: Response) {
    return routeRunner({
      feature: req.params.entity,
      operation: 'READ',
      queryOrBody: req.query,
      req,
      res,
      useCase: { name: 'readMany', function: 'getMany' }
    })
  })

  router.get('/crud/:entity/:field/:value', async function(req: Request, res: Response) {
    return routeRunner({
      feature: req.params.entity,
      operation: 'READ',
      queryOrBody: { [req.params.field]: req.params.value },
      req,
      res,
      useCase: { name: 'readOne', function: 'getOne' }
    })
  })

  router.delete('/crud/:entity/:id', async function(req: Request, res: Response) {
    return routeRunner({
      feature: req.params.entity,
      operation: 'DELETE',
      queryOrBody: +req.params.id,
      req,
      res,
      useCase: { name: 'delete' }
    })
  })
}
