import { useState } from 'react';
import ErrorContext from './ErrorContext';

/* Initial Statements */
const initialError = {
  code: null,
  error: false,
  text: '',
};

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(initialError);
  const [errorTimer, setErrorTimer] = useState(null);

  //Clean the errors and the intervals
  const resetErrors = () => {
    if (errorTimer) setErrorTimer(clearTimeout(errorTimer));

    setError(initialError);
  };

  //Create a error a set the timer and the error properties
  const createError = (time, error) => {
    if (errorTimer) setErrorTimer(timer => clearTimeout(timer));

    setErrorTimer(setTimeout(() => resetErrors(initialError), time));

    setError(error);
  };

  //: Global State
  const provide = {
    error,
    errorTimer,
    createError,
    resetErrors,
  };

  return (
    <ErrorContext.Provider value={provide}>{children}</ErrorContext.Provider>
  );
};

export default ErrorProvider;
