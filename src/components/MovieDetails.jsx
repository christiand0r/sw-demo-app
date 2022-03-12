import { useEffect, useState } from 'react';

/* Third Libraries */
import { Link, useLocation } from 'react-router-dom';

/* Helpers */
import http from '../helpers/http';
import plurals from '../helpers/plurals';

/* Components */
import Bar from './layout/Bar';
import Loader from './layout/Loader';
import Characters from './Characters';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  //Here using the props sending by User and MovieDetails
  const location = useLocation();
  const { url, username } = location.state;

  useEffect(() => {
    setLoading(true);

    http(url).then(({ data }) => {
      setMovie(data);
      setLoading(false);
    });

    setLoading(false);
  }, []);

  if (!movie || loading) return <Loader mode='cover' />;

  //Destructuring
  const { characters, title, director, producer, release_date, opening_crawl } =
    movie;

  return (
    <div className='container-fluid'>
      <Bar className='bar'>
        <h1>{title}</h1>
        <span>Estrenada: {release_date}</span>

        <div className='movie-data box'>
          <div className='container'>
            <h3>Director</h3>
            <p>{director}</p>
          </div>
          <div className='container'>
            <h3>{plurals(producer, ',') ? 'Productores' : 'Productor'}</h3>
            <p>{producer}</p>
          </div>
        </div>
      </Bar>
      <div className='movies'>
        <div className='header'>
          <h3>Detalles</h3>
          <Link to={`/user/${username}`} className='btn btn-details'>
            Volver a la lista
          </Link>
        </div>
        <div className='synopsis'>
          <div className='header'>Sinopsis</div>
          <div className='body'>{opening_crawl}</div>
        </div>

        <Characters movie={title} charactersURL={characters} />
      </div>
    </div>
  );
};

export default MovieDetails;
