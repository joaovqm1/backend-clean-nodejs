/* eslint-disable security/detect-object-injection */
import { Request, Response, Router } from 'express'
import multer from 'multer'

import { routeRunner } from '../runner'

const upload = multer({ dest: 'uploads/' })

export default (router: Router): void => {
  router.post('/file/upload', upload.single('file'), async function(req: Request, res: Response) {
    return routeRunner({
      feature: 'documents',
      operation: 'CREATE',
      queryOrBody: { description: req.body.description, ...req.file },
      req,
      res,
      useCase: { name: 'upload' }
    })
  })
}
