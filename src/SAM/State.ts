import { Option } from 'fp-ts/lib/Option'
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