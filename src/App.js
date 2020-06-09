import React, { useState, useCallback } from 'react';
import { useHistory } from './hooks/useHistory';
import './App.css';

const MAX_SIZE = 5;
const INITIAL_STATE = { count: 0, action: 'init' };

function App() {
  const [state, setState] = useState(INITIAL_STATE);
  const onChange = useCallback(({ history, step }) => {
    setState(history[step]);
  }, []);
  const {
    history,
    step,
    concat,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory({
      initialState: INITIAL_STATE,
      size: MAX_SIZE,
      onChange
    });
  return (
    <div className="app">
      Max size: { MAX_SIZE }
      <br/>
      Current: {state.count}
      <br/>
      Step: {step + 1} / {history.length}
      <br/>
      <button onClick={() => concat({ count: state.count - 1, action: 'decrement' })}>
        Decrement -
      </button>
      <button onClick={() => concat({ count: state.count + 1, action: 'increment' })}>
        Increment +
      </button>
      <div>=========HISTORY TRAVEL========</div>
      <button disabled={!canUndo()} onClick={() => undo()}>Undo</button>
      <button disabled={!canRedo()} onClick={() => redo()}>Redo</button>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            history.map(entry =>
              <tr key={Math.random()} className={entry === state ? 'selected' : ''}>
                <td>{entry.count}</td>
                <td>{entry.action}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
