import { State } from './State'
import { Actions, Types } from './Actions'
import { Dog } from '../Models/Dog'
import { userName, userTitle, stats, dogs as dogsLens, greeter } from './Lenses'
import { some } from 'fp-ts/lib/Option';


const incrementBy = (state: State, amt: number) =>
  stats.modify(stats => ({
    count: stats.count + amt,
    clicks: stats.clicks + 1
  })) (state)

const setDogs = (state: State, dogs: Array<Dog>) =>
  dogsLens.modify(_ => dogs) (state)

const setGreeting = (state: State, greeting: string) =>
  greeter.modify(_ => some((name: string) => `${greeting}, ${name}`))
    (state)

const setUserTitle = (state: State, title: string) =>
  userTitle.modify(_ => some(title)) (state)

const setUserName = (state: State, name: string) =>
  userName.modify(_ => some(name)) (state)


export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'incrementBy':
      return incrementBy(state, action.amt)
    case 'decrementBy':
      return incrementBy(state, -action.amt)
    case 'setDogs':
      return setDogs(state, action.dogs)
    case 'setGreeting':
      return setGreeting(state, action.greeting)
    case 'setUserTitle':
      return setUserTitle(state, action.title)
    case 'setUserName':
      return setUserName(state, action.name)
  }
}
