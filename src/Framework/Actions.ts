import {SetState} from './State'

export type Mutator<T> =
  (state: T) => T
// export type Mutator2<T, U> =
//   (state: T, params: U) => T
export type Mutator2<T, U> =
  (params: U) => (state: T) => T

export type EventMutator<T, U> =
  (event: U) => (state: T) => T
export type EventMutator2<T, U, V> =
  (params: U) => (event: V) => (state: T) => T

// rename 'method' to reduce confusion?

export const action = <T>(logic: Mutator<T>) =>
  (setState: SetState<T>) => () =>
    setState(prevState => logic(prevState))

export const action2 = <T, U>(logic: Mutator2<T, U>) =>
  (setState: SetState<T>) => (params: U) => () =>
    // setState(prevState => logic(prevState, params))
    setState(logic(params))

export const eventAction = <T, U>(logic: EventMutator<T, U>) =>
  (setState: SetState<T>) => (event: U) =>
    setState(logic(event))

export const eventAction2 = <T, U, V>(logic: EventMutator2<T, U, V>) =>
  (setState: SetState<T>) => (params: U) => (event: V) =>
    setState(logic(params)(event))