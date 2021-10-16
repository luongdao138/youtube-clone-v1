import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments';
import VideoHorizontal from '../../components/videoHorizontal';
import VideoMetadata from '../../components/videoMetadata';
import {
  checkVideoRating,
  getRelatedVideos,
  getVideoById,
} from '../../redux/actions/video';
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading, rating } = useSelector((state) => state.videoDetail);
  const { videos, loading: relatedVideoLoading } = useSelector(
    (state) => state.relatedVideos
  );
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id, true));
    dispatch(checkVideoRating(id));
  }, [id, dispatch]);

  const fetchData = () => {
    dispatch(getRelatedVideos(id, false));
  };

  return (
    <Row>
      <Col lg={8}>
        <div className='watch__player'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet.title}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        {video ? (
          <VideoMetadata video={video} videoId={id} rating={rating} />
        ) : (
          <h1>Loading...</h1>
        )}
        <Comments
          videoId={video?.id}
          commentCount={video?.statistics.commentCount}
        />
      </Col>
      <Col lg={4}>
        <InfiniteScroll
          dataLength={videos?.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
          }
        >
          {relatedVideoLoading ? (
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
              <Skeleton width='100%' height='130px' count={15} />
            </SkeletonTheme>
          ) : (
            videos
              .filter((x) => x.snippet)
              .map((x, index) => <VideoHorizontal video={x} key={index} />)
          )}
        </InfiniteScroll>
      </Col>
    </Row>
  );
};

export default WatchScreen;
