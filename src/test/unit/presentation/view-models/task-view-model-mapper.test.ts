import {
  CreateTaskRequestViewModel,
  CreateTaskResponseViewModel,
  TaskViewModelMapper,
  UpdateTaskRequestViewModel,
  UpdateTaskResponseViewModel,
  ReadTaskRequestViewModel,
  ReadTaskResponseViewModel
} from '@/presentation/features/task'
import { CreateTaskRequestDTO, Filter, ReadCrudRequestDTO, ReadTaskResponseDTO, tasksFieldsToInclude, UpdateTaskRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('Task View Model Mapper', function() {
  const viewModelMapper = new TaskViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    responsible: {
      id: 1,
      username: 'username'
    },
    title: 'TITULO DA TAREFA',
    description: 'TESTE DE TAREFAS',
    status: 'STATUS',
    startDate: '2020-08-26',
    finishDate: '2021-03-24',
    startTime: 'Mon Aug 24 2020',
    finishTime: 'Mon Aug 24 2020'
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateTaskRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateTaskRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateTaskResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadTaskResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateTaskRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateTaskRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateTaskResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadTaskResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadTaskRequestViewModel = {
        id: 1
      }

      const mockFilters: Filter[] = mockFiltersWithId.concat([{ name: 'include', fields: tasksFieldsToInclude }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadTaskResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadTaskResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
