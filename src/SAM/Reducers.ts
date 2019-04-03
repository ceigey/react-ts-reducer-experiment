import { State } from './State'
import { Actions, Types } from './Actions'
import { Dog } from '../Models/Dog'
import { userName, userTitle, stats, dogs as dogsLens, greeter } from './Lenses'
import { some } from 'fp-ts/lib/Option';

/*
  Remember, that as per the Lenses API,
  you call the modify method twice:
    1st with logic for making the modification
    2nd with the base object to modify (here, `state`)

  If you forget that, you will have a type error in the
  reducer that seems to be complaining about the state.
*/

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

const reverseUserName = (state: State) =>
  userName.modify(name => name.map(
    s => s.split('').reverse().join('')
  )) (state)

/**
 * A typesafe reducer that uses the --strict (or --strictNullChecks) tsc flag
 * in order make sure all actions are accounted for,
 * and no extra actions are defined.
 * 
 * @param state 
 * @param action 
 */
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
    case 'reverseUserName':
      return reverseUserName(state)
  }
}
