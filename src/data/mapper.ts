export interface BaseModelMapper {
  fromCreateRequestDTOToModel?: (request: any) => any
  fromUpdateRequestDTOToModel?: (request: any) => any
  fromModelToReadOneResponse: (model: any) => any
  fromModelToReadManyResponse: (models: any[]) => any[]
}
