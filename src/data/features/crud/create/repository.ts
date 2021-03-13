export interface CreateCrudRepository {
  create: (object: any) => Promise<any>
}
