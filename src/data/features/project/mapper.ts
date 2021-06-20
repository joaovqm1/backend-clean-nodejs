import { ObjectUtilities } from '@/data/contracts'
import { BaseModelMapper } from '@/data/mapper'
import {
  CreateProjectRequestDTO,
  ReadProjectResponseDTO,
  UpdateProjectRequestDTO,
} from '@/domain'

import { ProjectModel } from './model'

type ProjectModelWithNoRelation =
  Omit<ProjectModel, 'id' | 'customer' | 'technicalManager' | 'projectStatus' | 'projectType' | 'finances' | 'projectScopes' | 'projectPhases' | 'city' | 'state'>

export class ProjectModelMapper implements BaseModelMapper {
  constructor(private readonly objectUtilities: ObjectUtilities) { }

  fromCreateRequestDTOToModel(request: CreateProjectRequestDTO): ProjectModelWithNoRelation {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  // eslint-disable-next-line max-lines-per-function
  fromCreateUpdateRequestDTOToModel(request: CreateProjectRequestDTO | UpdateProjectRequestDTO): ProjectModelWithNoRelation {
    const copyRequest = { ...request }

    const customerId = copyRequest.customer.id
    const projectTypeId = copyRequest.projectType.id
    const projectStatusId = copyRequest.projectStatus.id
    const technicalManagerId = copyRequest.technicalManager.id
    const cityId = copyRequest.city?.id
    const stateId = copyRequest.state?.id

    delete copyRequest.customer
    delete copyRequest.projectType
    delete copyRequest.projectStatus
    delete copyRequest.technicalManager
    delete copyRequest.city
    delete copyRequest.state
    delete copyRequest.scopes

    const model: ProjectModelWithNoRelation = {
      ...copyRequest,
      name: copyRequest.name.toUpperCase(),
      address: copyRequest.address?.toUpperCase(),
      addressComplement: copyRequest.addressComplement?.toUpperCase(),
      addressReference: copyRequest.addressReference?.toUpperCase(),
      addressNumber: copyRequest.addressNumber?.toUpperCase(),
      annotation: copyRequest.annotation?.toUpperCase(),
      customerId,
      projectStatusId,
      projectTypeId,
      technicalManagerId,
      cityId,
      stateId,
      payment: undefined
    }

    if (request.payment) {
      const payment = copyRequest.payment
      const financesValue = this.objectUtilities.setNumberPrecision(payment.finances.reduce((prev, curr) => prev + curr.value, 0), 4)
      const finalValue = this.objectUtilities.setNumberPrecision((payment.entry || 0) + financesValue, 4)
      let numberOfFinances = payment.entry !== undefined ? 1 : 0
      if (payment.finances) {
        numberOfFinances += payment.finances.length
      }

      model.payment = {
        value: finalValue,
        entry: payment.entry,
        interval: payment.interval,
        financesValue,
        firstFinanceDate: payment.finances[0]?.date,
        numberOfFinances,
      }
    }

    return model
  }

  fromUpdateRequestDTOToModel(request: UpdateProjectRequestDTO): ProjectModelWithNoRelation {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromModelToReadOneResponse(model: ProjectModel): ReadProjectResponseDTO {
    delete model.customerId
    delete model.projectStatusId
    delete model.projectTypeId
    delete model.technicalManagerId
    delete model.cityId
    delete model.stateId

    return {
      ...model
    }
  }

  fromModelToReadManyResponse(models: ProjectModel[]): ReadProjectResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
