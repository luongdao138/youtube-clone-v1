import numeral from 'numeral';
import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Video from '../../components/video';
import {
  checkSubscriptionStatus,
  getChannelById,
  getVideosOfChannel,
} from '../../redux/actions/channel';
import './style.scss';

const ChannelScreen = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { channel, subscriptionStatus } = useSelector(
    (state) => state.channelDetail
  );
  useEffect(() => {
    dispatch(getVideosOfChannel(channelId));
    dispatch(getChannelById(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <>
      {/* Channel detaisl */}
      <div className='px-2 py-3 my-2 d-flex justify-content-between  align-items-center channel-header'>
        <div className='d-flex align-items-center channel-header__left'>
          <img src={channel?.snippet.thumbnails.medium.url} alt='' />
          <div className='ml-3 channelHeader__details'>
            <h4>{channel?.snippet.title}</h4>
            <span>
              {numeral(channel?.statistics.subscriberCount).format('0.a')}{' '}
              subscribers
            </span>
          </div>
        </div>
        <button className={subscriptionStatus && 'grey'}>
          {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <Container>
        <Row className='mt-2'>
          {loading
            ? [...new Array(15)].map((x, index) => (
                <Col md={4} lg={3}>
                  <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='140px' />
                  </SkeletonTheme>
                </Col>
              ))
            : videos?.map((video) => (
                <Col md={4} lg={3}>
                  <Video video={video} channelScreen />
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
