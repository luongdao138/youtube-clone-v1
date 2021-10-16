import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import './style.scss';

const Login = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken]);

  return (
    <div className='login'>
      <div className='login__container'>
        <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt='' />
        <button onClick={handleLogin}>Login with google</button>
        <p>A Youtube Clone made using Youtube api</p>
      </div>
    </div>
  );
};

export default Login;
