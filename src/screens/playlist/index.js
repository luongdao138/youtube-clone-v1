import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlayListVideo from '../../components/playListVideo';
import { getPlayList } from '../../redux/actions/playList';
import './style.scss';

const PlayListScreen = () => {
  const location = useLocation();
  const list = new URLSearchParams(location.search).get('list');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayList(list));
  }, [dispatch, list]);

  const { total, loading, videos } = useSelector((state) => state.playList);

  return (
    <Container>
      {videos?.map((video, index) => (
        <PlayListVideo key={video.id} video={video} />
      ))}
    </Container>
  );
};

export default PlayListScreen;
