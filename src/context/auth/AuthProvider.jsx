import { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  //Get the token and set the state
  const [auth, setAuth] = useState(() =>
    window.sessionStorage.getItem('token')
  );

  //Get url of character (User)
  const [url, setUrl] = useState(() => window.sessionStorage.getItem('url'));

  //: Global State
  const provide = {
    url,
    auth,
    setUrl,
    setAuth,
  };

  return (
    <AuthContext.Provider value={provide}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
