import { some, none } from 'fp-ts/lib/Option'
import { Dog } from '../Models/Dog'

/**
 * A helper function using generics
 * to force Typescript to recognise
 * the literal type of a string (e.g. :'myAction')
 * instead of its broader type (e.g. :string)
 * @param {string} key this key will have its literal type inferred
 */
// const type = <T extends string>(key: T): { type: T } => ({ type: key })
// const s = <T extends string>(key: T): T => key
const action = <T extends string, P extends {}>(key: T, params: P): { type: T } & P => ({ type: key, ...params})

/**
 * An analogue of keyof, except for maps of functions
 * Based on: type ValueOf<T> = T[keyof T]
 * See: https://stackoverflow.com/a/49286056
 * 
 * Lets you infer the Return Type
 * for multiple functions at a time.
 * Useful for typing reducers.
 */
type ReturnValueUnion<T extends { [x: string]: (...args: any[]) => any }> = ReturnType<T[keyof T]>
type ReturnValueMap<T extends { [x: string]: (...args: any[]) => any }> = { [K in keyof T]: ReturnType<T[K]> }

/*
const incrementBy = (amt: number) => {
  return { type: s('incrementBy'), amt }
}
const decrementBy = (amt: number) => {
  return { ...type('decrementBy'), amt }
}
const setGreeting = (greeting: string) => {
  return { ...type('setGreeting'), greeting }
}
const setUserName = (name: string) => {
  return { ...type('setUsername'), name }
}
const setUserTitle = (title: string) => {
  return { ...type('setUserTitle'), title }
}
const setDogs = (dogs: Array<Dog>) => {
  return { ...type('setDogs'), dogs }
}
*/

const incrementBy = (amt: number) =>
  action('incrementBy', { amt })

const decrementBy = (amt: number) =>
  action('decrementBy', { amt })

const setGreeting = (greeting: string) =>
  action('setGreeting', { greeting })

const setUserName = (name: string) =>
  action('setUserName', { name })

const setUserTitle = (title: string) =>
  action('setUserTitle', { title })

const setDogs = (dogs: Array<Dog>) =>
  action('setDogs', { dogs })


export const actions = {
  incrementBy,
  decrementBy,
  setGreeting,
  setUserName,
  setUserTitle,
  setDogs
}

export default actions
export type Actions = ReturnValueUnion<typeof actions>
export type Types = ReturnValueMap<typeof actions>

// type Actions2 =
//   | ReturnType<typeof incrementBy>
//   | ReturnType<typeof decrementBy>
//   | ReturnType<typeof setGreeting>
//   | ReturnType<typeof setUserName>
//   | ReturnType<typeof setUserTitle>
//   | ReturnType<typeof setDogs>