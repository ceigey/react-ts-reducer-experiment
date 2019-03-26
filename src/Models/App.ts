import { Option, none, some } from 'fp-ts/lib/Option'
import { Lens } from 'monocle-ts'
import { SetState, StateProps } from '../Framework/State'
import { action, action2, eventAction } from '../Framework/Actions'
import { value } from '../Util/GetTargetValue'

export interface AppState {
  stats: {
    count: number
    clicks: number
  }
  greeting: Option<string>
}

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


export const incCountWithClicks = action<AppState>(
  Stats.modify(stats => ({
    count: stats.count + 1,
    clicks: stats.clicks + 1
  }))
)

export const addToCountWithClicks = action2<AppState, number>(
  num =>
    Stats.modify(stats => ({
      count: stats.count + num,
      clicks: stats.clicks + 1
    }))
)

export const resetCounter = action<AppState>(
  Stats.modify(stats => ({
    count: 0,
    clicks: stats.clicks + 1
  }))
)

export const removeGreeting = action<AppState>(
  Greeting.modify(_ => none)
)

export const addGreeting = eventAction<AppState, React.ChangeEvent<HTMLInputElement>>(
  event => {
    const value = event.target.value
    return Greeting.modify(_ => value.length ? some(value) : none)
  }
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