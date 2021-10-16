import React from 'react';
import './style.scss';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = ({ handleToggleSideBar }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchTerm}`);
  };

  return (
    <div className='header'>
      <FaBars
        className='header__menu'
        size={26}
        onClick={handleToggleSideBar}
      />
      <img
        src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
        alt=''
        className='header__logo'
        onClick={() => history.push('/')}
      />
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit' disabled={searchTerm === ''}>
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className='header__icons'>
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.photoURL} alt='' />
      </div>
    </div>
  );
};

export default Header;
