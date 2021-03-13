export interface Authentication {
  createPasswordHash: (password: string) => Promise<string>
  comparePasswordAndHash: (password: string, hash: string) => Promise<boolean>
}
