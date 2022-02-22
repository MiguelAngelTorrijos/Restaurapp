import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../img/restaurapp.svg';
import { useContext } from 'react';
import { UserContext } from '../../context/newCotext';

export const Navbar = () => {
  const { token, logout } = useContext(UserContext);

  let isLogged = token;

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className='navbar'>
      <div className='navbar__container-logo'>
        <Link href='/restaurant'>
          <a>
            <Image
              className='navbar__container-logo__logo'
              src={Logo}
              alt='Logo'
            />
          </a>
        </Link>
      </div>
      <nav className='navbar__links'>
        <Link href='/restaurant'>
          <a className='navbar__links__link'>Restaurants</a>
        </Link>

        {isLogged ? (
          <button
            className='navbar__links__link no-btn'
            href='#'
            onClick={handleClick}
          >
            <a>Logout</a>
          </button>
        ) : (
          <Link href='/login'>
            <a className='navbar__links__link'>Login</a>
          </Link>
        )}
      </nav>
    </div>
  );
};
