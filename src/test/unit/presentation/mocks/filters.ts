import { FilterBuilder } from '@/data'

export const mockFiltersWithId = new FilterBuilder()
  .equalTo('id', 1)
  .build()