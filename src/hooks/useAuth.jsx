import { useState, useContext, useCallback } from 'react';
import AuthContext from '../context/auth/AuthContext';
import ErrorContext from '../context/error/ErrorContext';
import loginService from '../services/login';

const useAuth = () => {
  //States
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  //Context
  const { url, auth, setUrl, setAuth } = useContext(AuthContext);
  const { createError, resetErrors } = useContext(ErrorContext);

  const logout = useCallback(() => {
    //Remove token and set state null
    window.sessionStorage.removeItem('url');
    window.sessionStorage.removeItem('token');
    setAuth(null);
  }, [setAuth]);

  const login = useCallback(
    ({ username, password }) => {
      setLoading(true);

      //Call API and get data
      loginService({ username, password })
        .then(({ token, url }) => {
          //Get token
          window.sessionStorage.setItem('url', url);
          window.sessionStorage.setItem('token', token);

          //If all ok, set auth with token
          setLoading(false);
          setAuth(token);
          setUrl(url);
        })
        .catch(error => {
          //Remove token
          if (auth) {
            window.sessionStorage.removeItem('url', url);
            window.sessionStorage.removeItem('token', token);
          }

          //If happens an error, set error
          setLoading(false);
          createError(3500, error);

          setTimeout(() => resetErrors(), 3500);

          //Number of attempts before lockout
          setCounter(counter + 1);
        });
    },
    [setAuth, createError, setLoading, setCounter]
  );

  return {
    isAuth: Boolean(auth),
    isLoading: loading,
    login,
    logout,
  };
};

export default useAuth;
