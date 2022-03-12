import { useRef } from 'react';

/* Third Librareies */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Custom Hooks */
import useAuth from '../../hooks/useAuth';

const Bar = ({ children }) => {
  const menu = useRef();

  const { logout } = useAuth();

  const toggleMenu = () => menu.current.classList.toggle('active');

  return (
    <div className='bar'>
      <div className='container'>
        {children}

        <div className='menu' ref={menu}>
          <div className='menu-container'>
            <nav>
              <button className='btn btn-blank btn-block' onClick={logout}>
                Cerrar Sesión
              </button>
            </nav>
            <button className='btn btn-toggle' onClick={toggleMenu}>
              <i className='ri-menu-5-line'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Bar.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Bar;
