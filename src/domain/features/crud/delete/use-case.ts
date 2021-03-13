export type DeleteCrudRequestDTO = number
export type DeleteCrudResponseDTO = string

export interface DeleteCrudUseCase {
  delete: (id: DeleteCrudRequestDTO) => Promise<DeleteCrudResponseDTO>
}
