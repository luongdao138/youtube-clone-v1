import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribedChannels } from '../../redux/actions/channel';
import './style.scss';
import VideoHorizontal from '../../components/videoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const { channels, loading } = useSelector(
    (state) => state.subscribedChannels
  );
  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  return (
    <Container fluid>
      {loading ? (
        <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
          <Skeleton width='100%' height='160px' count={20} />
        </SkeletonTheme>
      ) : (
        channels?.map((channel) => (
          <VideoHorizontal
            key={channel.id}
            video={channel}
            subscriptionScreen
          />
        ))
      )}
    </Container>
  );
};

export default SubscriptionScreen;
