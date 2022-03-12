import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/auth/AuthProvider';
import ErrorProvider from './context/error/ErrorProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import User from './components/User';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <AuthProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/user/:username'
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path='/movie/:name'
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AuthProvider>
  );
};

export default App;
