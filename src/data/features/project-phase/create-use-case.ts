import { DateUtilities } from '@/data/contracts'
import { FilterBuilder } from '@/data/filter-builder'
import {
  CreateCrudUseCase,
  CreateProjectPhaseRequestDTO,
  CreateProjectPhasesForProjectRequestDTO,
  CreateProjectPhasesForProjectUseCase,
  ReadCrudUseCase,
  ReadPhaseResponseDTO,
  ReadProjectPhaseResponseDTO
} from '@/domain'

interface Params {
  readPhasesUseCase: ReadCrudUseCase<ReadPhaseResponseDTO>
  createProjectPhaseUseCase: CreateCrudUseCase<CreateProjectPhaseRequestDTO, ReadProjectPhaseResponseDTO>
  dateUtilities: DateUtilities
}

export class CreateProjectPhasesForProjectImpl implements CreateProjectPhasesForProjectUseCase {
  private readonly readPhasesUseCase: ReadCrudUseCase<ReadPhaseResponseDTO>
  private readonly createProjectPhaseUseCase: CreateCrudUseCase<CreateProjectPhaseRequestDTO, ReadProjectPhaseResponseDTO>
  private readonly dateUtilities: DateUtilities

  constructor(params: Params) {
    this.createProjectPhaseUseCase = params.createProjectPhaseUseCase
    this.readPhasesUseCase = params.readPhasesUseCase
    this.dateUtilities = params.dateUtilities
  }

  async create(request: CreateProjectPhasesForProjectRequestDTO): Promise<ReadProjectPhaseResponseDTO[]> {
    const phases = await this.getMainPhases()

    const projectPhases: ReadProjectPhaseResponseDTO[] = []

    for (const phase of phases) {
      const createProjectPhaseRequest: CreateProjectPhaseRequestDTO = {
        project: request.project,
        startDate: this.dateUtilities.format(new Date()),
        phase
      }

      projectPhases.push(await this.createProjectPhaseUseCase.create(createProjectPhaseRequest))
    }

    return projectPhases
  }

  async getMainPhases(): Promise<ReadPhaseResponseDTO[]> {
    const filters = new FilterBuilder()
      .containedIn('description', ['LEVANTAMENTO', 'ANTEPROJETO', 'EXECUTIVO', 'DETALHAMENTO'])
      .select(['id'])
      .build()

    return (await this.readPhasesUseCase.getMany(filters)).items
  }
}