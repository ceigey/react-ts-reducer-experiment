import * as React from 'react'
import { useState, useReducer } from 'react'
import { render } from "react-dom";
import { Option, none, some } from 'fp-ts/lib/Option'
import { AppState, actions } from './Models/App'
import { CounterButtonPanel } from './Components/CounterButtonPanel'

import { State as RedState, defaultState } from './SAM/State'
import { actions as redActions } from './SAM/Actions'
import { reducer } from './SAM/Reducers'
import { getDogs } from './SAM/Effects'

import "./styles.css";

/*
  Remember to use ctrl+. to trigger intellisense after:
    - a dot as you're about to write a property name
    - a quote as you're about to write a string literal
    - and many other contexts
*/

function App() {
  const [state, setState] = useState<AppState>({
    stats: { count: 0, clicks: 0, },
    greeting: none
  });
  const [redState, dispatch] = useReducer(reducer, defaultState)
  return (
    <div className="App">
      <h1><code>useReducer</code> Test</h1>
      <h2>See <code>./SAM</code> folder</h2>

      <h3>Counter demo</h3>
      <div>
        <button className='success'
          onClick={() => dispatch(redActions.incrementBy(5))}
        >
          {redState.stats.count} + 5
        </button>
        <button className='danger'
          onClick={() => dispatch(redActions.decrementBy(5))}
        >
          {redState.stats.count} - 5
        </button>
      </div>

      <h3>String demo</h3>
      <div>
        <div>
          Type your name here.
          <input
            onChange={evt => dispatch(redActions.setUserName(evt.currentTarget.value))}
            value={redState.user.name.getOrElse('')}
          />
        </div>
        <br />
        <div>
          Type your title here.
          <input
            onChange={evt => dispatch(redActions.setUserTitle(evt.currentTarget.value))}
            value={redState.user.title.getOrElse('')}
          />
        </div>
        <br />
        <div>
          Type your greeting here.
          <input
            onChange={evt => dispatch(redActions.setGreeting(evt.currentTarget.value))}
            // I accidentally broke the logic by pushing the greeting straight into a function type...
            // value={redState.user.name.getOrElse('')}
          />
        </div>
        <br />
        <div>
          <code>{
            redState.greeter
              .getOrElse(name => `Hello, ${name}`)
              (redState.user.name.getOrElse('<No name...>'))
          }</code>
        </div>
        <br />
        <button className='warning'
          onClick={() => dispatch(redActions.reverseUserName())}
        >
          Reverse your name!
        </button>
      </div>
      <br />
      
      <h3>Doggo-time</h3>
      <div>
        <button className='warning'
          onClick={() => getDogs(dogs => dispatch(redActions.setDogs(dogs)))}
        >
          Get some!
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {redState.dogs.map((dog, i) => <img style={{width: 100, borderRadius: 20, padding: 10 }} key={i} src={dog.url}/>)}
        </div>
      </div>

      
      <br />
      <hr />
      <br />

      <h2>The old demo</h2>
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
