export interface CreateCrudUseCase<RequestDTO, ResponseDTO> {
  create: (object: RequestDTO) => Promise<ResponseDTO>
}

export interface AfterCreateCrudUseCase<ResponseDTO> {
  fetchAfterCreation: (id: number) => Promise<ResponseDTO>
}
