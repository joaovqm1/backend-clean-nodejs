import faker from 'faker'

import {
  CreateProjectPhaseRequestViewModel,
  CreateProjectPhaseResponseViewModel,
  UpdateProjectPhaseRequestViewModel,
  UpdateProjectPhaseResponseViewModel,
  ReadProjectPhaseRequestViewModel,
  ReadProjectPhaseResponseViewModel,
  ProjectPhaseViewModelMapper
} from '@/presentation'
import {
  CreateProjectPhaseRequestDTO,
  projectPhasesFieldsToInclude,
  ReadProjectPhaseResponseDTO,
  UpdateProjectPhaseRequestDTO
} from '@/domain'
import { mockFiltersWithId } from '../mocks'
import { Filter } from 'aws-sdk/clients/devicefarm'

describe('Project Phase View Model Mapper', function() {
  const viewModelMapper = new ProjectPhaseViewModelMapper()

  const createUpdateRequestDTO: CreateProjectPhaseRequestViewModel = {
    project: {
      id: faker.datatype.number()
    },
    phase: {
      id: faker.datatype.number()
    },
    startDate: faker.date.future().toISOString(),
    dueDate: faker.date.future().toISOString(),
    finishDate: faker.date.future().toISOString()
  }

  const responseDTO: ReadProjectPhaseResponseDTO = {
    id: faker.datatype.number(),
    ...createUpdateRequestDTO
  }

  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateProjectPhaseRequestViewModel = createUpdateRequestDTO

      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel))
        .toEqual({
          ...responseDTO,
          id: undefined
        })
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateProjectPhaseResponseViewModel = responseDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responseDTO as ReadProjectPhaseResponseDTO))
        .toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateProjectPhaseRequestViewModel = {
        id: faker.datatype.number(),
        ...createUpdateRequestDTO
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel))
        .toEqual({
          ...responseDTO as UpdateProjectPhaseRequestDTO,
          id: requestViewModel.id
        })
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateProjectPhaseResponseViewModel = responseDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responseDTO as ReadProjectPhaseResponseDTO))
        .toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadProjectPhaseRequestViewModel = {
        id: 1
      }

      const mockFilters = mockFiltersWithId.concat([{
        name: 'include',
        fields: projectPhasesFieldsToInclude
      }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadProjectPhaseResponseViewModel[] = [responseDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responseDTO] as ReadProjectPhaseResponseDTO[]))
        .toEqual(readResponseViewModel)
    })
  })
})
