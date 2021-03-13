export interface DeleteCrudRepository {
  get: (id: number) => Promise<any>
  delete: (id: number) => Promise<void>
}
