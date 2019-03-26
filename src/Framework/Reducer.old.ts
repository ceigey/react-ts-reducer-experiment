/**
 * The bare minimum requirements for an action.
 */
export interface Action { type: string }

/**
 * A generic middleware.
 * Takes an intermediate data form of
 * some type T, and returns State of
 * type S
 */
export type Middleware<S, T> =
  (intermediateData: T) => S

/**
 * Some callback that takes state and an action
 * record and tries to perform a mutation
 */
export type MutatorLogic<S, A extends Action> =
  (state: S, action: A) => S

/**
 * The final product the mutator gives the developer
 * after it has been wired up to some MutatorLogic
 */
export type WiredMutator<S, A extends Action> =
  (state: S, action: A) => S

/**
 * Some generic mutator that takes a piece of logic
 * and returns a function that can be used for
 * providing the state and action later.
 */
export type Mutator<S, A extends Action> =
  (m: MutatorLogic<S, A>) => WiredMutator<S, A>

// const test = { 
//   a: 1,
//   b: 2
// }
// export interface Mutators<S, A extends Action, K extends string> {
//   [X in K]: Mutator<S, A>
// }

// type Mutators<S, A extends Action, K extends string> = { [Key in K]: WiredMutator<S, A> }
// interface Mutators2
interface Mutators<S, A extends Action> {
  [x: string]: WiredMutator<S, A>
}

export const getMutator = <
  S, A extends Action, Ms extends Mutators<S, A>, K extends keyof Ms
>(mutators: Ms) =>
  (type: K): WiredMutator<S, A> => mutators[type]

export const mutator = <S, A extends Action>(m: MutatorLogic<S, A>) =>
  (state: S, action: A) =>
    m(state, action)

// Digressing aside...
// The challenge now is we need to call this
// mutator from a reducer without incurring
// TypeScript's wrath.

export const reducer = <
  S, T, A extends Action, Ms extends Mutators<S, A>
>(mutators: Ms) => (state: S, action: A) => {
    // const type:  = action.type
    const mutator = getMutator<S, A, Ms, A['type']>(mutators)(action.type)
    return mutator(state, action)
  }

  export const reducer2 = <
  S, A extends Action, Ms
>(mutators: Ms) => (state: S, action: A) => {
    // const type:  = action.type
    type ActionType = typeof action.type
    const mutator = mutators[action.type]
    return mutator(state, action)
  }


// Test data

const testState = {
  a: 1, b: 2
}

const successAction = {
  type: 'success'
}

const failAction = {
  type: 'fail'
}

const doubleFail = {
  type: 'success',
  value: 'banana'
}

const mutators = {
  success: (
    state: typeof testState,
    action: typeof successAction
  ) => state
}

reducer2<typeof testState, typeof successAction, typeof mutators>(mutators)(testState, doubleFail)