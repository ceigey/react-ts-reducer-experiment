import { Lens } from 'monocle-ts'
import { State } from './State'

const stateLensPath = Lens.fromPath<State>()
const stateLensProp = Lens.fromProp<State>()
const stateLensProps = Lens.fromProps<State>()

export const stats = stateLensProp('stats')
export const userName = stateLensPath([ 'user', 'name' ])
export const userTitle = stateLensPath([ 'user', 'title'])
export const greeter = stateLensProp('greeter')
export const dogs = stateLensProp('dogs')
