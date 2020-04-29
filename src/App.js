import React, { useState } from 'react';
import './App.css';

const useHistory = (initialState, size = 5) => {
  const [history, setHistory] = useState([initialState]);
  const [step, setStep] = useState(0);

  const getCurrent = () => {
    return history[step]};
  const concat = x => setHistory((prevHistory) => {
    if (history.length >= size) {
      return prevHistory.slice(1).concat(x);
    }
    setStep(step + 1);
    return prevHistory.concat(x);
  });
  const undo = () => setStep(prevStep => prevStep - 1);
  const redo = () => setStep(prevStep => prevStep + 1);

  return {
    history,
    step,
    getCurrent,
    concat,
    undo,
    redo,
  }
};

function App() {
  const MAX_SIZE = 5;
  const { getCurrent, concat, undo, redo, history, step } = useHistory({ count: 0 }, MAX_SIZE);
  const current = getCurrent();
  return (
    <div className="app">
      Max size: { MAX_SIZE }
      <br/>
      Current: {current.count}
      <br/>
      Step: {step + 1} / {history.length}
      <br/>
      <button onClick={() => concat({count: current.count - 1})}>Decrement -</button>
      <button onClick={() => concat({count: current.count + 1})}>Increment +</button>
      <div>=======================================</div>
      <button disabled={step === 0} onClick={() => undo()}>Undo</button>
      <button disabled={step === history.length - 1} onClick={() => redo()}>Redo</button>
      <ul style={{ width: 200 }}>
        {
          history.map(entry => <li key={Math.random()} className={entry === current ? 'selected': ''}>{entry.count}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
