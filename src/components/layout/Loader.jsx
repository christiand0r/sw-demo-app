import PropTypes from 'prop-types';

const Loader = ({ mode }) => {
  return (
    <div className={`loader ${mode}`}>
      <i className='ri-loader-2-fill'></i>
    </div>
  );
};

Loader.propTypes = {
  mode: PropTypes.string,
};

export default Loader;
