/* eslint-disable security/detect-object-injection */
import { Request, Response } from 'express'

import { Controller } from '@/presentation'

import { ControllerFactory } from './factories'
import { accessHeaderField, officeIdHeaderField } from './headers'

export async function routeRunner(
  params: {
    feature: string
    operation: string
    req: Request
    res: Response
    useCase: {
      name: string
      function?: string
    }
    queryOrBody: any
  }
): Promise<void> {
  const { feature, req, res, useCase, queryOrBody, operation } = params
  try {

    const facade: { [useCase: string]: Controller } = await ControllerFactory.get({
      feature,
      token: (req.headers.token || req.headers[accessHeaderField]) as string,
      officeId: +req.headers.officeid || +req.headers[officeIdHeaderField],
      operation
    })

    const httpResponse = await facade[useCase.name].handle(useCase.function || useCase.name, queryOrBody)
    res.status(httpResponse.statusCode).json({
      data: httpResponse.data
    })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}
