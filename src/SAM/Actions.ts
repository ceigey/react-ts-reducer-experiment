import { some, none } from 'fp-ts/lib/Option'
import { Dog } from '../Models/Dog'

/**
 * A helper function for TypeScript
 * that creates a record for the action
 * and associates it with the correct type
 * so it can be checked-against in an
 * exhaustive switch statement.
 * 
 * @param {<T extends string>} type the type of the action  
 * @param {<P>} params the parameters to be sent along with the action type
 * 
 * @returns {{ type: T } & P} A record of shape `{ type, param1, ...paramN }`
 */
const action = <T extends string, P>(type: T, params: P): { type: T } & P => ({ type, ...params})


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

const reverseUserName = () =>
  action('reverseUserName', {})


export const actions = {
  incrementBy,
  decrementBy,
  setGreeting,
  setUserName,
  setUserTitle,
  setDogs,
  reverseUserName
}

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

export type Actions = ReturnValueUnion<typeof actions>
export type Types = ReturnValueMap<typeof actions>