import { BaseCrudViewModelMapper } from '@/presentation'
import faker from 'faker'

const phoneFormat = '(##) #####-####'
export function formatedPhone(): string {
  return faker.phone.phoneNumber(phoneFormat)
}

const ieFormat = '###.###.###/####'
export function formatedIe(): string {
  return faker.phone.phoneNumber(ieFormat)
}

const zipCodeFormat = '##.###-###'
export function formatedZipCode(): string {
  return faker.address.zipCode(zipCodeFormat)
}

export function removeSpecialCharactersFromString(string: string = ''): string {
  return string.replace(/[/().-]+/g, '').replace(/\s/g, '')
}

export class ViewModelMapper implements BaseCrudViewModelMapper {
  // create
  fromCreateRequestViewModelToCreateRequestDTO(request: any): any {
    return request
  }

  fromCreateResponseDTOToCreateResponseViewModel(response: any): any {
    return response
  }

  // update
  fromUpdateRequestViewModelToUpdateRequestDTO(request: any): any {
    return request
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(response: any): any {
    return response
  }

  // read
  fromReadRequestViewModelToReadRequestDTO(request: any): any {
    return request
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: any): any {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: any[]): any[] {
    return response
  }
}
