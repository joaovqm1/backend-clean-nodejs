import sinon from 'sinon'
import { object } from 'joi'
import { AxiosRequestConfig, AxiosError } from 'axios'

import { HttpRequestImpl } from '@/utilities'
import { PostPutParams, GetParams, DeleteParams } from '@/data/contracts'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - Request Manager', function() {
  const requestManager = new HttpRequestImpl('baseURL')
  const postPutParms: PostPutParams = {
    url: 'baseURL',
    body: { nome: 'nome' },
    headers: 'headers'
  }
  const error: AxiosError = {
    name: 'Erro Teste',
    config: {},
    isAxiosError: true,
    message: 'Erro Message',
    toJSON: function() { return object }
  }

  it('Should post object', async function() {
    const stubParams: AxiosRequestConfig = {
      data: postPutParms.body,
      method: 'post',
      headers: postPutParms.headers,
      url: postPutParms.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: stubParams.data }

    sinon.stub(requestManager, 'send').withArgs(stubParams).returns(stubResponse.data)

    expect(await requestManager.post(postPutParms)).toEqual(stubResponse.data)
  })

  it('Should put object', async function() {
    const stubParams: AxiosRequestConfig = {
      data: postPutParms.body,
      method: 'put',
      headers: postPutParms.headers,
      url: postPutParms.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: stubParams.data }

    sinon.stub(requestManager, 'send').withArgs(stubParams).returns(stubResponse.data)

    expect(await requestManager.put(postPutParms)).toEqual(stubResponse.data)
  })

  it('Should get object', async function() {
    const getParams: GetParams = {
      url: 'baseURL',
      query: { id: 1 },
      headers: 'headers'
    }
    const stubGetParams: AxiosRequestConfig = {
      params: getParams.query,
      method: 'get',
      headers: getParams.headers,
      url: getParams.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: { user: 'dev' } }

    sinon.stub(requestManager, 'send').withArgs(stubGetParams).resolves({ user: 'dev' })

    expect(await requestManager.get(getParams)).toEqual(stubResponse.data)
  })

  it('Should delete object', async function() {
    const deleteParams: DeleteParams = {
      url: 'baseURL',
      headers: 'headers'
    }
    const stubGetParams: AxiosRequestConfig = {
      method: 'delete',
      headers: deleteParams.headers,
      url: deleteParams.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: 'Deletado com sucesso' }

    sinon.stub(requestManager, 'send').withArgs(stubGetParams).resolves(stubResponse.data)

    expect(await requestManager.delete(deleteParams)).toEqual(stubResponse.data)
  })

  it('Should get error message', function() {
    expect(requestManager.getErrorMessage(error)).toEqual(error.message)
  })

  it('Should get error response data', function() {
    const errorResp: AxiosError = {
      ...error,
      response: {
        status: 404,
        statusText: 'FAIL',
        data: 'Reponse Data',
        headers: 'header',
        config: {}
      }
    }

    expect(requestManager.getErrorMessage(errorResp)).toEqual(errorResp.response.data)
  })
})
