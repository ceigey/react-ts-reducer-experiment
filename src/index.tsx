import * as React from 'react'
import { useState, useReducer } from 'react'
import { render } from "react-dom";
import { Option, none, some } from 'fp-ts/lib/Option'
import { AppState, actions } from './Models/App'

import { CounterButtonPanel } from './Components/CounterButtonPanel'


import "./styles.css";

function App() {
  const [state, setState] = useState<AppState>({
    stats: { count: 0, clicks: 0, },
    greeting: none
  });
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
