import * as React from 'react'
import { useState, useReducer } from 'react'
import { render } from "react-dom";
import { Option, none, some } from 'fp-ts/lib/Option'
import { AppState, actions } from './Models/App'

import { CounterButtonPanel } from './Components/CounterButtonPanel'

import "./styles.css";

interface Action { 
  type: string
}

interface RedState {
  count: number
}

const incrementBy = (amt: number) => {
  return { type: 'incrementBy', amt }
}
const decrementBy = (amt: number) => {
  return { type: 'decrementBy', amt }
}

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`)
  }
}

type Actions =
  | { type: 'increment' }
  | { type: 'decrement' }
  // | ReturnType<typeof incrementBy>
  // | ReturnType<typeof decrementBy>
  | { type: 'incrementBy', amt: number }
  | { type: 'decrementBy', amt: number }

  // : React.Reducer<AppState, 
const reducer = (state: RedState, action: Actions) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'incrementBy':
      return { count: state.count + action.amt }
    case 'decrementBy':
      return { count: state.count - action.amt }
    default:
      throw new UnreachableCaseError(action)
  }
};



function App() {
  const [state, setState] = useState<AppState>({
    stats: { count: 0, clicks: 0, },
    greeting: none
  });
  const [redState, dispatch] = useReducer(reducer, {
    count: 0
  })

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CounterButtonPanel
        actions={actions}
        state={state}
        setState={setState}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
