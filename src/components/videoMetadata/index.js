import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import './style.scss';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import ShowMoreText from 'react-show-more-text';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkSubscriptionStatus,
  getChannelById,
  subscribeChannel,
  unsubscribeChannel,
} from '../../redux/actions/channel';
import parser from 'react-html-parser';
import { useHistory } from 'react-router-dom';
import { rateVideo } from '../../redux/actions/video';

const VideoMetadata = ({ video, videoId, rating }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getChannelById(video.snippet.channelId));
    dispatch(checkSubscriptionStatus(video.snippet.channelId));
  }, [video.snippet.channelId, dispatch]);

  const { loading, channel, subscriptionStatus, subscriptionId } = useSelector(
    (state) => state.channelDetail
  );

  const handleLikeVideo = (type) => {
    let ratingType;
    if (type === rating) ratingType = 'none';
    else ratingType = type;
    console.log(ratingType);
    dispatch(rateVideo(videoId, ratingType));
  };

  const handleSubscibeChannel = () => {
    if (subscriptionStatus) {
      dispatch(unsubscribeChannel(subscriptionId, video.snippet.channelId));
    } else {
      dispatch(subscribeChannel(video.snippet.channelId));
    }
  };

  return (
    <div className='videoMetadata py-2'>
      <div className='videoMetadata__top'>
        <h5>{video.snippet.title}</h5>
        <div className='d-flex justify-content-between align-content-center py-1 '>
          <span>
            {numeral(video.statistics.viewCount).format('0.a')} views •{' '}
            {moment(video.snippet.publishedAt).fromNow()}
          </span>
          <div>
            <span
              onClick={() => handleLikeVideo('like')}
              style={{ cursor: 'pointer' }}
              className={`mr-3 ${rating === 'like' && 'videoMetadata__active'}`}
            >
              <MdThumbUp size={26} style={{ marginRight: '6px' }} />
              {numeral(video.statistics.likeCount).format('0.a')}
            </span>
            <span
              onClick={() => handleLikeVideo('dislike')}
              style={{ cursor: 'pointer' }}
              className={`mr-3 ${
                rating === 'dislike' && 'videoMetadata__active'
              }`}
            >
              <MdThumbDown size={26} style={{ marginRight: '6px' }} />
              {numeral(video.statistics.dislikeCount).format('0.a')}
            </span>
          </div>
        </div>
      </div>
      <div className='videoMetadata__channel d-flex justify-content-between align-items-center my-2 py-2'>
        <div
          className='d-flex '
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(`/channel/${channel?.id}`)}
        >
          <img
            src={channel?.snippet.thumbnails.medium.url}
            alt=''
            className='rounded-circle mr-3'
          />
          <div className='d-flex flex-column '>
            <span>{video.snippet.channelTitle}</span>
            <span>
              {numeral(channel?.statistics.subscriberCount).format('0.a')}{' '}
              subscribers
            </span>
          </div>
        </div>
        <button
          className={
            subscriptionStatus
              ? 'btn border-0 p-2 m-2 btn-gray'
              : 'btn border-0 p-2 m-2'
          }
          onClick={handleSubscibeChannel}
        >
          {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className='videoMetadata__description'>
        <ShowMoreText
          lines={3}
          more='SHOW MORE'
          less='SHOW LESS'
          anchorClass='showmoreText'
          expanded={false}
        >
          {parser(video.snippet.description)}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetadata;
