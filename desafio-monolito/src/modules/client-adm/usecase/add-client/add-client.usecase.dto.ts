
export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
}

export interface AddClientOutputDto {
  id: string
  name: string
  email: string
  document: string
  createdAt: Date
  updatedAt: Date
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
}