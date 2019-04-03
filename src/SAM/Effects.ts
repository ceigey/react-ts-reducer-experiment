import { left, right } from 'fp-ts/lib/Either'
import { apiEndpoint, Dog, dogResponse, getDogsFromResponse } from '../Models/Dog'

export const getDogs = (dogHandler: (dogs: Array<Dog>) => void) => {
  fetch(apiEndpoint, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => {
    const maybeDogs = dogResponse.decode(json)
    if (maybeDogs.isLeft()) {
      console.warn(`The response from ${apiEndpoint} failed`, json)
    }
    return maybeDogs.getOrElse({ status: 'failure', message: [] })
  })
  .then(getDogsFromResponse)
  .then(dogHandler)
  .catch(err => {
    console.warn(`The response from ${apiEndpoint} failed with an exception`, err)
  })
}