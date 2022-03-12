import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* Custom Hooks */
import useAuth from '../hooks/useAuth';

/* Helpers */
import crypting from '../helpers/crypto';
import prettyPath from '../helpers/prettyPath';

/* Components */
import Alert from './layout/Alert';
import Loader from './layout/Loader';
import ErrorContext from '../context/error/ErrorContext';

//Initial Statements
const initialForm = {
  password: '',
  username: '',
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // @Destructuring Form
  const { password, username } = form;

  //React Router
  const navigate = useNavigate();

  //Custom Hooks
  const { login, isAuth, isLoading, isInvalidate } = useAuth();

  //Context
  const { error, createError, resetErrors } = useContext(ErrorContext);

  //If is authenticate redirecto to profile
  useEffect(() => {
    if (isAuth) navigate(`/user/${prettyPath(username)}`);
  }, [isAuth, isInvalidate]);

  //Than more of three attempts lockout the button login
  useEffect(() => {
    if (attempts < 3) return;
    setDisabled(true);

    setTimeout(() => setDisabled(false), 60000);
  }, [attempts]);

  // @Methods
  const handleChange = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value,
    });

  const handleLogin = e => {
    e.preventDefault();

    //Valide fields not empty
    for (const key in form) {
      if (form[key].trim() === '')
        return createError(3500, {
          code: null,
          error: true,
          text: 'Todos los campos son requeridos',
        });
    }

    //Clear errors
    resetErrors();

    //Encode password and code
    login({ username, password: crypting.encode(password) });

    //If login error
    setAttempts(attempts + 1);
  };

  return (
    <div className='form-user'>
      <div className='form-container'>
        <div className='logo'>
          <img src='/sw-logo.png' alt='Star Wars logo' />
          <h1>DEMO APP</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className='form-field'>
            <label htmlFor='username'>
              <i className='ri-user-4-fill'></i>
            </label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={handleChange}
              value={username}
              placeholder='Usuario'
              autoComplete='none'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='password'>
              <i className='ri-lock-password-fill'></i>
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={handleChange}
              value={password}
              placeholder='Contraseña'
            />
          </div>

          <button
            type='submit'
            className='btn btn-submit btn-block'
            disabled={isLoading || disabled}>
            {isLoading ? <Loader /> : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
      {error.error && <Alert text={error.text} type='error' />}
    </div>
  );
};

export default Login;
