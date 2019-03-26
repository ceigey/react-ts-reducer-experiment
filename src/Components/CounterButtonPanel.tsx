import * as React from 'react'
import { useRef } from 'react'
import { AppState, CentralProps } from '../Models/App'
import { SetState, StateProps } from '../typings/Actions'

export interface Props
  extends CentralProps {}

export const CounterButtonPanel =
  ({ actions, state, setState }: Props) => {
    return <div>
      <div>Current count: {state.stats.count}</div>
      <div>Current clicks: {state.stats.clicks}</div>
      <button
        id='increment-button'
        className='success'
        onClick={actions.incCountWithClicks(setState)}
      >
        +1
      </button>
      <button
        id='any-button'
        className='warning'
        onClick={actions.addToCountWithClicks(setState)(5)}
      >
        +5
      </button>
      <button
        id='reset-button'
        className='danger'
        onClick={actions.resetCounter(setState)}
      >
        Reset (not a 'click')
      </button>
      <br />
      <br />
      <div>
        {'Greeting: ' +
          state.greeting
            .getOrElse('...')
          }
      </div>
      <br />
      <div>
        {'Greeting type: '}
        <code>
          {state.greeting.inspect()}
        </code>
      </div>
      <br />
      <input
        value={state.greeting.getOrElse('')} // setting to null = no update in DOM!
        onChange={actions.addGreeting(setState)}
      />
      <button
        id='reset-greeting'
        className='danger'
        onClick={actions.removeGreeting(setState)}
      >
        Reset
      </button>
    </div>
  }