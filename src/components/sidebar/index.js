import React from 'react';
import './style.scss';
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import { AiFillClockCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';

const Sidebar = ({ sideBarOpen, handleToggleSideBar }) => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <nav
      className={sideBarOpen ? 'sidebar open' : 'sidebar'}
      onClick={() => handleToggleSideBar(false)}
    >
      <Link to='/'>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>

      <Link to='/feed/subscriptions'>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <Link to='/playList?list=LL'>
        <li>
          <MdThumbUp size={23} />
          <span>Liked videos</span>
        </li>
      </Link>
      <Link to='/'>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
      </Link>
      <Link to='/playList?list=WL'>
        <li>
          <AiFillClockCircle size={23} />
          <span>Watch later</span>
        </li>
      </Link>
      <Link to='/'>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
      </Link>
      <Link to='/'>
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I don't now</span>
        </li>
      </Link>
      <hr />
      <Link onClick={handleLogout} to='/'>
        <li>
          <MdExitToApp size={23} />
          <span>Log out</span>
        </li>
      </Link>
      <hr />
    </nav>
  );
};

export default Sidebar;
