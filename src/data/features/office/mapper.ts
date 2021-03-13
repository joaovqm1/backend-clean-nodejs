import { BaseModelMapper } from '@/data/mapper'
import {
  CreateOfficeRequestDTO,
  ReadOfficeResponseDTO,
  UpdateOfficeRequestDTO,
} from '@/domain'
import { OfficeModel } from './model'

export class OfficeModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateOfficeRequestDTO
  ): Omit<OfficeModel, 'id'> {
    const cityId = request.city.id
    const planId = request.plan?.id
    const stateId = request.state.id

    delete request.city
    delete request.plan
    delete request.state

    return {
      ...request,
      planId,
      stateId,
      cityId
    }
  }

  fromModelToReadOneResponse(model: OfficeModel): ReadOfficeResponseDTO {
    return {
      ...model,
    }
  }

  fromModelToReadManyResponse(
    models: OfficeModel[]
  ): ReadOfficeResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }

  fromUpdateRequestDTOToModel(
    request: UpdateOfficeRequestDTO
  ): OfficeModel {
    return {
      ...request,
      planId: request.plan.id,
      stateId: request.state.id,
      cityId: request.city.id,
    }
  }
}
