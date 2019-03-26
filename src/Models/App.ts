import { Option, none, some } from 'fp-ts/lib/Option'
import { Lens } from 'monocle-ts'
import { SetState, StateProps, Action, Action2, ChangeAction } from '../typings/Actions'
import { value } from '../Util/GetTargetValue'


// We define our state here.
// This is neater than defining it with the
// App component, and can be imported
// by child components sharing logic.
export interface AppState {
  stats: {
    count: number
    clicks: number
  }
  greeting: Option<string>
}

// Defining AppState Lens
// These Lenses let us *focus* (haha!)
// on a single part of an record, and
// modify the whole record immutably
// without needing to touch the rest of it!
// Read the original Scala docs:
// https://julien-truffaut.github.io/Monocle/optics/lens.html
const AppPath = Lens.fromPath<AppState>()
const AppProp = Lens.fromProp<AppState>()

const Stats =
  AppProp('stats')

const Count =
  AppPath(['stats', 'count'])

const Clicks =
  AppPath(['stats', 'clicks'])

const Greeting =
  AppProp('greeting')

// Actions go below
// We then export them as an actions constant

const incCountWithClicks: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Stats.modify(stats => ({
        count: stats.count + 1,
        clicks: stats.clicks + 1
      })) (prevState)
    )

const addToCountWithClicks: Action2<AppState, number> =
  setState => n => () =>
    setState(prevState => 
      Stats.modify(stats => ({
        count: stats.count + n,
        clicks: stats.clicks + 1
      })) (prevState)
    )

const resetCounter: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Count.modify(_ => 0) (prevState)
    )

const removeGreeting: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Greeting.modify(_ => none) (prevState)
    )

const addGreeting: ChangeAction<AppState> =
  setState => (e) => {
    const str = value(e)
    return setState(prevState =>
      Greeting.modify(_ => some(str)) (prevState)
    )
  }

const action =
  <T>(logic: (prevState: T) => T) => (setState: SetState<T>) => () =>
    setState(logic)

const action2 =
  <T, U>(logic: (prevState: T) => T) => (setState: SetState<T>) => (x: U) => () =>
    setState(logic)

const action2Demo =
  action2<AppState, number>(prevState =>
    prevState
  )

export const actions = {
  incCountWithClicks,
  addToCountWithClicks,
  resetCounter,
  removeGreeting,
  addGreeting,
}

// Finally we export some
// interfaces for convenience

export type AppActions = typeof actions

export interface CentralProps
  extends StateProps<AppState> {
    actions: AppActions
  }