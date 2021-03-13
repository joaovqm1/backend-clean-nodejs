export interface UpdateCrudUseCase<RequestDTO, ResponseDTO> {
  update: (object: RequestDTO) => Promise<ResponseDTO>
}

export interface AfterUpdateCrudUseCase<ResponseDTO> {
  fetchAfterUpdate: (id: number) => Promise<ResponseDTO>
}
