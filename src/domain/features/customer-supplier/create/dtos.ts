import { CustomerSupplierEntity } from '../entity'

export interface CreateCustomerSupplierRequestDTO extends Omit<CustomerSupplierEntity, 'id'> { }
export interface CreateCustomerSupplierResponseDTO extends CustomerSupplierEntity { }
