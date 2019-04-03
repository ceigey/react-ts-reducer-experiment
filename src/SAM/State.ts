import { Option, none } from 'fp-ts/lib/Option'
import { Dog } from '../Models/Dog'


export type State = {
  stats: {
    count: number
    clicks: number
  }
  greeter:
    Option<(s: string) => string>
  user: {
    name: Option<string>
    title: Option<string>
  }
  note: string
  dogs: Array<Dog>
}


export const defaultState: State = {
  stats: {
    count: 0,
    clicks: 0,
  },
  greeter: none,
  user: {
    name: none,
    title: none,
  },
  note: '',
  dogs: []
}