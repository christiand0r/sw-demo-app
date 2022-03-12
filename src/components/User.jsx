import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import http from '../helpers/http';
import FeedMovies from './FeedMovies';
import Bar from './layout/Bar';
import Loader from './layout/Loader';
import Movie from './Movie';

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //Context
  const { url, setUserPath } = useContext(AuthContext);

  //RR
  const { username } = useParams();

  useEffect(() => {
    setLoading(true);

    http(url).then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const transformToDate = date => new Date(date).toLocaleDateString();

  if (!user || loading) return <Loader mode='cover' />;

  return (
    <div className='container-fluid'>
      <Bar className='bar'>
        <h1>{user.name}</h1>
        <span>Creado: {transformToDate(user.created)}</span>
      </Bar>
      <div className='movies'>
        <h3>Peliculas</h3>

        <FeedMovies films={user.films} />
      </div>
    </div>
  );
};

export default User;
