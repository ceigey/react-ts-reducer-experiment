import { Type, success, failure, identity } from 'io-ts'

export const apiEndpoint = 'https://dog.ceo/api/breeds/image/random/3'

export interface Dog {
  url: string
}

export interface DogResponse {
  status: 'success' | 'failure'
  message: Array<string>
}


const isDogResponse = (u: unknown): u is DogResponse => u.status === 'success' && u.message instanceof Array

export const dogResponse = new Type<DogResponse, DogResponse, unknown>(
  'dogResponse',
  isDogResponse,
  (u,c) => isDogResponse(u) ? success(u) : failure (u, c),
  identity
)

export const getDogsFromResponse = (response: DogResponse): Array<Dog> =>
  response.message.map(url => ({ url }))