import PropTypes from 'prop-types';

const Alert = ({ text, type = 'error' }) => {
  return <div className={`alert ${type}`}>{text}</div>;
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};
export default Alert;
