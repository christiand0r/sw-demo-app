/* Third Libraries */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* Helpers */
import prettyPath from '../helpers/prettyPath';

/* Components */
import Loader from './layout/Loader';

const Movie = ({ film, username }) => {
  //Destructuring props
  const { director, opening_crawl, title, url } = film;

  //In the element Link pass a state with: url and username
  //Url allow start the request of movie in the component where extends the details (MovieDetails)
  //And username is a prop for binding with parent component (User)

  if (!film) return <Loader />;

  return (
    <div className='card'>
      <div className='card-header'>
        <h2 className='movie-name'>{title}</h2>
        <div className='movie-data'>
          <p>Director: {director}</p>
        </div>
      </div>
      <div className='card-body'>
        <p>{opening_crawl}</p>
        <Link
          to={`/movie/${prettyPath(title)}`}
          state={{ url, username }}
          className='btn btn-details'>
          MÁS DETALLES
        </Link>
      </div>
    </div>
  );
};

Movie.propTypes = {
  film: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default Movie;
