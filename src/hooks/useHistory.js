import { useState, useEffect } from 'react';

export const useHistory = ({ initialState, size = 5, onChange }) => {
  const [history, setHistory] = useState([initialState]);
  const [step, setStep] = useState(0);

  const getCurrent = () => {
    return history[step];
  };
  const concat = x => setHistory((prevHistory) => {
    // Making a history entry from point back in time should add
    // the entry after this point and discard the "future" entries
    if (step < history.length - 1) {
      setStep(step + 1);
      return prevHistory.slice(0, step + 1).concat(x);
    }
    // Keep the history at maximum size of 'size'
    if (history.length >= size) {
      return prevHistory.slice(1).concat(x);
    }
    setStep(step + 1);
    return prevHistory.concat(x);
  });
  const undo = () => setStep(prevStep => prevStep - 1);
  const redo = () => setStep(prevStep => prevStep + 1);
  const canUndo = () => step !== 0;
  const canRedo = () => step !== history.length - 1
  useEffect(() => {
    onChange({ history, step });
  }, [history, step]);

  return {
    history,
    step,
    getCurrent,
    concat,
    undo,
    redo,
    canUndo,
    canRedo,
  }
};
