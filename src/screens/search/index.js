import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoHorizontal from '../../components/videoHorizontal';
import { getVideosBySearch } from '../../redux/actions/video';
import './style.scss';

const SearchScreen = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosBySearch(searchTerm));
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.searchVideos);

  return (
    <Container>
      {loading ? (
        <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
          <Skeleton width='100%' height='160px' count={20} />
        </SkeletonTheme>
      ) : (
        videos.map((video, index) => (
          <VideoHorizontal key={index} searchScreen video={video} />
        ))
      )}
    </Container>
  );
};

export default SearchScreen;
