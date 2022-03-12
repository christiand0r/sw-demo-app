import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Third Libraries */
import short from 'short-uuid';
import PropTypes from 'prop-types';

/* Components */
import Movie from './Movie';

//Generator of unique keys
const translator = short();

const FeedMovies = ({ films = [] }) => {
  const [listFilms, setListFilms] = useState(null);

  //Dynamic segment of the url send for binding reference with this component
  const { username } = useParams();

  useEffect(() => {
    const req = films.map(film => fetch(film));

    const getFilms = async () => {
      const res = await Promise.all(req);
      const data = await Promise.all(res.map(res => res.json()));

      setListFilms(data);
    };

    getFilms();
  }, []);

  if (!listFilms)
    return (
      <li>
        <h3>No se encontraron peliculas</h3>
      </li>
    );

  return (
    <ul className='card-list'>
      {listFilms.map(film => (
        <Movie key={translator.new()} film={film} username={username} />
      ))}
    </ul>
  );
};

FeedMovies.propTypes = {
  films: PropTypes.array.isRequired,
};

export default FeedMovies;
