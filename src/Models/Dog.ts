import {} from 'io-ts'

export interface Dog {
  url: string
}

export interface DogResponse {
  status: "success"
  message: Array<string>
}

