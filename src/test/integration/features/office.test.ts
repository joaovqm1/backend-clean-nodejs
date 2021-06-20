import request from 'supertest'
import faker from 'faker'
import fakerBr from 'faker-br'

import truncate from '@/test/utilities/truncate'
import { UtilitiesFactory } from '@/main/factories/utilities'
import app from '@/main/config/app'
import { removeSpecialCharactersFromString, formatedPhone, formatedIe, formatedZipCode } from '@/test/utilities/fakes'
import {
  checkCreatedObjectEqualsExpected,
  checkReceivedObjectEqualsExpected,
  checkUpdatedObjectEqualsExpected
} from '@/test/utilities/checker'
import { CreateOfficeRequestViewModel, UpdateOfficeRequestViewModel } from '@/presentation'
import { Office, User } from '@/infra/database/models'
import { UnauthorizedOfficesAcesssError } from '@/domain'

const objectUtilities = UtilitiesFactory.getObject()

function getRandomCreateOfficeViewModel(name: string): CreateOfficeRequestViewModel {
  return {
    user: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    },
    email: faker.internet.email(),
    name,
    tradingName: faker.company.companyName(),
    owner: faker.name.findName(),
    cnpj: fakerBr.br.cnpj({ format: true }),
    cpf: fakerBr.br.cpf({ format: true }),
    cellphone: formatedPhone(),
    plan: {
      id: 1
    },
    state: {
      id: 1
    },
    city: {
      id: 1
    },
    postcode: formatedZipCode(),
    address: faker.address.streetName(),
    neighborhood: faker.address.streetAddress(),
    addressNumber: faker.address.streetSuffix()
  }
}

describe('Office', function() {
  const officesNames = {
    create: 'CREATE OFFICE CRUD TEST',
    read: 'READ OFFICE CRUD TEST',
    update: 'UPDATE OFFICE CRUD TEST',
    delete: 'DELETE OFFICE CRUD TEST'
  }

  beforeAll(async function() {
    await truncate([
      officesNames.create,
      officesNames.read,
      officesNames.update,
      officesNames.delete
    ])
  })

  describe('Create', function() {
    const createRequestViewModel = getRandomCreateOfficeViewModel(officesNames.create)

    let expectedOffice: any

    it('Should create new office and user', async function() {
      // Act
      const response = await request(app)
        .post('/api/crud/offices')
        .send({
          data: createRequestViewModel
        })

      // Assert
      expect(response.status).toBe(200)

      const createdOffice = response.body.data
      expectedOffice = {
        ...createRequestViewModel,
        name: createRequestViewModel.name.toUpperCase(),
        owner: createRequestViewModel.owner.toUpperCase(),
        tradingName: createRequestViewModel.tradingName.toUpperCase(),
        cnpj: removeSpecialCharactersFromString(createRequestViewModel.cnpj),
        cpf: removeSpecialCharactersFromString(createRequestViewModel.cpf),
        cellphone: removeSpecialCharactersFromString(createRequestViewModel.cellphone),
        postcode: removeSpecialCharactersFromString(createRequestViewModel.postcode),
        neighborhood: createRequestViewModel.neighborhood.toUpperCase(),
        address: createRequestViewModel.address.toUpperCase(),
        state: {
          id: 1,
          name: 'MINAS GERAIS'
        },
        city: {
          id: 1,
          name: 'SÃO SEBASTIÃO DO RIO PRETO'
        },
        plan: {
          id: 1,
          name: 'TRIAL'
        }
      }

      delete expectedOffice.user

      const expectedOfficeWithUser = {
        ...expectedOffice,
        user: {
          emailVerified: false,
          officeId: response.body.data.id,
          email: createRequestViewModel.email,
          username: createRequestViewModel.user.username,
          name: createRequestViewModel.owner.toUpperCase(),
          role: {
            id: 2,
            name: 'ARCHITECT'
          }
        }
      }
      checkCreatedObjectEqualsExpected({
        receivedObject: createdOffice,
        expectedObject: expectedOfficeWithUser,
        checkOfficeId: false,
        checkCreaterId: false
      })
    })

    it('Should throw error when trying to create another office with the same name', async function() {
      // Act
      const response = await request(app)
        .post('/api/crud/offices')
        .send({
          data: createRequestViewModel
        })

      // Assert
      expect(response.status).toBe(403)
      expect(response.body.data).toBe('Já existe uma conta cadastrada com esse nome e cnpj')
    })

    it('Should log the just created user in', async function() {
      // Arrange
      const crendetialsQuery = {
        usernameOrEmail: createRequestViewModel.user.username,
        password: createRequestViewModel.user.password
      }

      // Act
      const response = await request(app)
        .get('/api/users/login')
        .query(crendetialsQuery)
        .send()

      // Assert
      expect(response.status).toBe(200)

      const expectUserOffice = objectUtilities.cloneObject(expectedOffice)
      delete expectUserOffice.user

      const receivedUser = response.body.data
      const expectedUser = {
        username: createRequestViewModel.user.username,
        email: expectedOffice.email,
        image: null,
        imageName: null,
        name: expectedOffice.owner,
        emailVerified: false,
        recoveryToken: null,
        commissionPercentage: null,
        role: {
          id: 2,
          name: 'ARCHITECT'
        },
        office: expectUserOffice
      }

      expect(typeof receivedUser.token).toBe('string')

      checkReceivedObjectEqualsExpected({
        receivedObject: receivedUser,
        expectedObject: expectedUser,
        checkOfficeId: false,
        checkCreaterId: false
      })
    })
  })

  describe('Read', function() {
    const createViewModel = getRandomCreateOfficeViewModel(officesNames.read)
    let loggedUser: any

    it('Should receive the created company when call get', async function() {
      // Arrange
      const postResponse = await request(app)
        .post('/api/crud/offices')
        .send({
          data: createViewModel
        })

      const createdOffice = postResponse.body.data
      loggedUser = createdOffice.user

      // Act
      const getResponse = await request(app)
        .get(`/api/crud/offices/id/${createdOffice.id}`)
        .set('token', createdOffice.user.token)
        .set('officeId', createdOffice.id)
        .send()

      // Assert
      expect(getResponse.status).toBe(200)

      const receivedOffice = getResponse.body.data
      const expectedOffice = createdOffice
      delete expectedOffice.user

      checkReceivedObjectEqualsExpected({
        receivedObject: receivedOffice,
        expectedObject: expectedOffice,
        checkOfficeId: false,
        checkCreaterId: false
      })
    })

    it('Should throw error when trying to read all the offices', async function() {
      // Act
      const response = await request(app)
        .get('/api/crud/offices')
        .set('token', loggedUser.token)
        .set('officeId', loggedUser.officeId)
        .send()

      // Assert
      expect(response.status).toBe(403)
      expect(response.body.data).toBe(new UnauthorizedOfficesAcesssError().message)
    })
  })

  describe('Update', function() {
    const createOfficeViewModel = getRandomCreateOfficeViewModel(officesNames.update)

    it('Should update the just created office', async function() {
      // Arrange
      const postResponse = await request(app)
        .post('/api/crud/offices')
        .send({
          data: createOfficeViewModel
        })

      const createdOffice = postResponse.body.data

      const updateOfficeViewModel: UpdateOfficeRequestViewModel = {
        id: createdOffice.id,
        email: faker.internet.email(),
        name: officesNames.update,
        tradingName: faker.company.companyName(),
        owner: faker.name.findName(),
        cnpj: fakerBr.br.cnpj({ format: true }),
        cpf: fakerBr.br.cpf({ format: true }),
        cellphone: formatedPhone(),
        plan: {
          id: 2
        },
        state: {
          id: 2
        },
        city: {
          id: 3
        },
        postcode: formatedZipCode(),
        address: faker.address.streetName(),
        neighborhood: faker.address.streetAddress(),
        addressNumber: faker.address.streetSuffix()
      }

      // Act
      const response = await request(app)
        .put(`/api/crud/offices/${createdOffice.id}`)
        .set('token', createdOffice.user.token)
        .set('officeId', createdOffice.user.officeId)
        .send({
          data: updateOfficeViewModel
        })

      // Assert
      expect(response.status).toBe(200)

      const updatedOffice = response.body.data
      const expectedOffice = {
        ...updateOfficeViewModel,
        name: updateOfficeViewModel.name.toUpperCase(),
        owner: updateOfficeViewModel.owner.toUpperCase(),
        tradingName: updateOfficeViewModel.tradingName.toUpperCase(),
        cnpj: removeSpecialCharactersFromString(updateOfficeViewModel.cnpj),
        cpf: removeSpecialCharactersFromString(updateOfficeViewModel.cpf),
        cellphone: removeSpecialCharactersFromString(updateOfficeViewModel.cellphone),
        postcode: removeSpecialCharactersFromString(updateOfficeViewModel.postcode),
        neighborhood: updateOfficeViewModel.neighborhood.toUpperCase(),
        address: updateOfficeViewModel.address.toUpperCase(),
        state: {
          id: 2,
          name: 'SÃO PAULO'
        },
        city: {
          id: 3,
          name: 'SÃO PAULO'
        },
        plan: {
          id: 2,
          name: 'PAID'
        }
      }

      checkUpdatedObjectEqualsExpected({
        receivedObject: updatedOffice,
        expectedObject: expectedOffice,
        checkOfficeId: false,
        checkCreaterId: false,
        checkUpdaterId: false
      })
    })
  })

  describe('Delete', function() {
    const createOfficeViewModel = getRandomCreateOfficeViewModel(officesNames.delete)

    it('Should not be able to get company and user after call delete', async function() {
      // Arrange
      const postResponse = await request(app)
        .post('/api/crud/offices')
        .send({
          data: createOfficeViewModel
        })

      const createdOffice = postResponse.body.data

      // Act
      const deleteResponse = await request(app)
        .delete(`/api/crud/offices/${createdOffice.id}`)
        .set('token', createdOffice.user.token)
        .set('officeId', createdOffice.id)
        .send()

      const office = await Office.findOne({
        where: {
          name: createdOffice.name
        }
      })

      const user = await User.findOne({
        where: {
          officeId: createdOffice.id
        }
      })

      // Assert
      expect(deleteResponse.status).toBe(200)
      expect(deleteResponse.body.data).toBe('Item removido com sucesso')
      expect(office).toBeNull()
      expect(user).toBeNull()
    })
  })
})
