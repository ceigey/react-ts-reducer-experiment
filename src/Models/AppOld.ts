import { Option, none, some } from 'fp-ts/lib/Option'
import { Lens } from 'monocle-ts'
import { SetState, StateProps, Action, Action2 } from '../typings/Actions'



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

// // If Stats were more complex...
// const Stats =
//   Stats.compose(
//     Lens.fromProps<AppState['stats']>()
//     (['count', 'clicks'])
//   )

// Types for actions
// @todo Should be placed elsewhere and made generic

//------------------------------------

const incCountSpread: Action<AppState> =
  setState => () => {
    setState(prevState => ({
      ...prevState,
      stats: {
        ...prevState.stats,
        count: prevState.stats.count + 1
      }
    }))
  }

// Alternative, with monocle-ts
// This becomes much cleaner!
const incCountWithLens: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Count.modify(count => count + 1) (prevState)
    )

// When we need to modify two things, the complexity
// ramps up quite a bit.

// Harder to read
const incCountWithClicks: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Stats.modify(stats => ({
        count: stats.count + 1,
        clicks: stats.clicks + 1
      })) (prevState)
    )

// More memory
const incCountImperative: Action<AppState> =
  setState => () =>
    setState(prevState => {
      const withCount =
        Count.modify(n => n + 1) (prevState)
      const withClicks =
        Clicks.modify(n => n + 1) (withCount)
      return withClicks
    })

// Compare with above approach
const inCountWithClicksSpread: Action<AppState> =
  setState => () =>
    setState(prevState => ({
      ...prevState,
      stats: {
        ...prevState.stats,
        count: prevState.stats.count + 1,
        clicks: prevState.stats.clicks + 1
      }
    }))

const addToCountWithClicks: Action2<AppState, number> =
  setState => n => () =>
    setState(prevState => 
      Stats.modify(stats => ({
        count: stats.count + n,
        clicks: stats.clicks + 1
      })) (prevState)
    )

const removeGreeting: Action<AppState> =
  setState => () =>
    setState(prevState =>
      Greeting.modify(_ => none) (prevState)
    )

const addGreeting: Action2<AppState, string> =
  setState => (str) => () =>
    setState(prevState =>
      Greeting.modify(_ => some(str)) (prevState)
    )

export const actions = {
  incCountWithClicks,
  addToCountWithClicks
}

export type AppActions = typeof actions

export interface CentralProps
  extends StateProps<AppState> {
    actions: AppActions
  }