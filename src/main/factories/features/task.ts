import {
  TaskModelMapper,
} from '@/data'
import {
  CreateTaskRequestDTO,
  ReadTaskResponseDTO,
  tasksFieldsToInclude,
  UpdateTaskRequestDTO,
} from '@/domain'
import { TaskViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class TaskFactory {
  private readonly taskCrudFactory: CrudFactory<CreateTaskRequestDTO, ReadTaskResponseDTO, ReadTaskResponseDTO, UpdateTaskRequestDTO>
  constructor(readonly requestParams: RequestParamsWithUser) {
    this.taskCrudFactory = new CrudFactory<CreateTaskRequestDTO, ReadTaskResponseDTO, ReadTaskResponseDTO, UpdateTaskRequestDTO>({
      requestParams,
      entityName: 'tasks',
      modelMapper: new TaskModelMapper(requestParams.userId),
      viewModelMapper: new TaskViewModelMapper(),
      uniqueConstraintError: 'Já existe uma tarefa cadastrada com esse título',
      fieldsToIncludeOnQuery: tasksFieldsToInclude
    })
  }

  getControllerFacade(): any {
    return this.taskCrudFactory.getControllerFacade()
  }
}
