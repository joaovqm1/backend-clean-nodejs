import request from 'supertest'

import { UtilitiesFactory } from '@/main/factories/utilities'
import app from '@/main/config/app'
import { checkReceivedObjectEqualsExpected } from '@/test/utilities/checker'
import { ReadCityResponseViewModel } from '@/presentation'

describe('City', function() {
  describe('Read', function() {
    it('Should receive a list of cities from some states', async function(done) {
      // Act
      const response = await request(app)
        .get('/api/crud/cities')
        .query({
          stateId: 1
        })
        .send()

      const receivedViewModels: ReadCityResponseViewModel[] = response.body.data.items

      // Assert
      expect(response.status).toBe(200)

      const expectedViewModels: ReadCityResponseViewModel[] = [{
        id: 1,
        name: 'SÃO SEBASTIÃO DO RIO PRETO',
        ibge: 3164803,
        state: {
          id: 1,
          name: 'MINAS GERAIS'
        }
      }, {
        id: 2,
        name: 'BELO HORIZONTE',
        ibge: 3164802,
        state: {
          id: 1,
          name: 'MINAS GERAIS'
        }
      }]


      expect(receivedViewModels.length).toBeLessThanOrEqual(2)
      for (const expectedViewModel of expectedViewModels) {
        checkReceivedObjectEqualsExpected({
          receivedObject: receivedViewModels.find(viewModel => viewModel.id === expectedViewModel.id),
          expectedObject: expectedViewModel
        })
      }

      done()
    })

    it('Should receive a list of cities from any state', async function(done) {
      // Act
      const response = await request(app)
        .get('/api/crud/cities')
        .send()

      const receivedViewModels: ReadCityResponseViewModel[] = response.body.data.items

      // Assert
      expect(response.status).toBe(200)

      const expectedViewModel: ReadCityResponseViewModel = {
        id: 1,
        name: 'SÃO SEBASTIÃO DO RIO PRETO',
        ibge: 3164803,
        state: {
          id: 1,
          name: 'MINAS GERAIS'
        }
      }

      checkReceivedObjectEqualsExpected({
        receivedObject: receivedViewModels.find(viewModel => viewModel.id === expectedViewModel.id),
        expectedObject: expectedViewModel
      })
      done()
    })
  })
})
