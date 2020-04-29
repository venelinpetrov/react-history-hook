import React, { useState } from 'react';

export const useHistory = (initialState, size = 5) => {
  const [history, setHistory] = useState([initialState]);
  const [step, setStep] = useState(0);

  const getCurrent = () => {
    return history[step]
  };
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
