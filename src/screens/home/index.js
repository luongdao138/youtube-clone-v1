import React, { useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import './style.scss';
import CategoryBar from '../../components/categoryBar';
import Video from '../../components/video';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPopularVideos,
  getVideosByKeywords,
} from '../../redux/actions/video';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeleton/SkeletonVideo';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { videos, category, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchData = () => {
    if (category === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByKeywords(category));
    }
  };

  return (
    <Container className='homescreen'>
      <CategoryBar />
      {/* <Row> */}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        className='row'
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div>
        }
      >
        {!loading
          ? videos.map((video, index) => (
              <Col
                md={4}
                lg={3}
                key={
                  video.id instanceof Object
                    ? video.id.videoId + index
                    : video.id + index
                }
              >
                <Video video={video} />
              </Col>
            ))
          : [...new Array(20)].map((x, index) => (
              <Col md={4} lg={3} key={index}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
      {/* </Row> */}
    </Container>
  );
};

export default HomeScreen;
