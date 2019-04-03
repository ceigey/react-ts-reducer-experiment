import { Lens } from 'monocle-ts'
import { State } from './State'

/*
  These lenses are used to create a new copy
  of an object with changes based on just
  a single property, or multiple on the same level
  (see fromProp_s_, plural -s is important here)

  The first set of functions, e.g. `Lens.fromPath<...>()`,
  are used to associate the right type with our Lenses
  and gives us a function we can use to make specific
  lenses for that kind of data type.

  The second set of functions, e.g. `stateLensProp('....')`,
  gives us the ability to select a prop we want to "focus"
  on (that's where the "lens" analogy comes from).

  This then returns a function that has two parameter lists:
    * the first is for a function `(T) => T` which modifies the
      original property
    * the second is for the base object we are going to make
      a modified copy from
*/

const stateLensPath = Lens.fromPath<State>()
const stateLensProp = Lens.fromProp<State>()
const stateLensProps = Lens.fromProps<State>()

export const stats = stateLensProp('stats')
export const userName = stateLensPath([ 'user', 'name' ])
export const userTitle = stateLensPath([ 'user', 'title'])
export const greeter = stateLensProp('greeter')
export const dogs = stateLensProp('dogs')
