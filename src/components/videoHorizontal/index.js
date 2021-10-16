import React, { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Row, Col } from 'react-bootstrap';
import axios from '../../api';
import { useHistory } from 'react-router-dom';

const VideoHorizontal = ({ video, searchScreen, subscriptionScreen }) => {
  const seconds = moment.duration('100').asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  const [viewCount, setViewCount] = useState('');
  const [subcriberCount, setSubcriberCount] = useState('');
  const [videosCount, setVideosCount] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const history = useHistory('');
  const isVideo = !(video.id.kind === 'youtube#channel' || subscriptionScreen);
  const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel';
  const _channelId = video.snippet.resourceId?.channelId || video.id.channelId;
  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${video.id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };
  useEffect(() => {
    if (isVideo) {
      const getVideoDetail = async () => {
        const res = await axios.get('/videos', {
          params: {
            id: video.id.videoId,
            part: 'statistics',
          },
        });

        setViewCount(res.data.items[0].statistics.viewCount);
      };

      getVideoDetail();
    }
  }, [video, isVideo]);

  useEffect(() => {
    if (!isVideo) {
      const getChannelIcon = async () => {
        const res = await axios.get('/channels', {
          params: {
            id: _channelId,
            part: 'snippet,statistics',
          },
        });
        console.log(res);
        setChannelUrl(res.data.items[0].snippet.thumbnails.medium.url);
        setVideosCount(res.data.items[0].statistics.videoCount);
        setSubcriberCount(res.data.items[0].statistics.subscriberCount);
      };

      getChannelIcon();
    }
  }, [_channelId, isVideo]);

  return (
    <Row
      className='videoHorizontal m-1 py-2 '
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subscriptionScreen ? 4 : 6}
        className='videoHorizontal__left d-flex align-align-items-center'
      >
        <LazyLoadImage
          src={video.snippet.thumbnails.medium.url}
          effect='blur'
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName='videoHorizontal__thumbnail__wrapper'
        />
        {/* <span className='videoHorizontal__duration'>{_duration}</span> */}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subscriptionScreen ? 8 : 6}
        className='videoHorizontal__right p-0'
      >
        <p
          className='videoHorizontal__right__title'
          style={{
            fontSize: searchScreen ? '18px' : '14px',
            marginBottom: searchScreen || subscriptionScreen ? '5px' : '0',
          }}
        >
          {video.snippet.title}
        </p>
        <div className='videoHorizontal__details'>
          {!isVideo && (
            <span className='videoHorizontal__time mb-1'>
              {numeral(subcriberCount).format('0.a')} views •
              <span>{videosCount} videos</span>
            </span>
          )}
          {isVideo &&
            (searchScreen ? (
              <>
                <span className='videoHorizontal__time'>
                  {numeral(viewCount).format('0.a')} views •
                  <span>{moment(video.snippet.publishedAt).fromNow()}</span>
                </span>
                <span className='videoHorizontal__channel'>
                  {isVideo && searchScreen && (
                    <LazyLoadImage
                      src={channelUrl}
                      effect='blur'
                      className='videoHorizontal__thumbnail'
                      wrapperClassName='videoHorizontal__thumbnail__wrapper'
                    />
                  )}
                  {video.snippet.channelTitle}
                </span>
              </>
            ) : (
              <>
                <span className='videoHorizontal__channel'>
                  {isVideo && searchScreen && (
                    <LazyLoadImage
                      src={channelUrl}
                      effect='blur'
                      className='videoHorizontal__thumbnail'
                      wrapperClassName='videoHorizontal__thumbnail__wrapper'
                    />
                  )}
                  {video.snippet.channelTitle}
                </span>
                <span className='videoHorizontal__time'>
                  {numeral(viewCount).format('0.a')} views •
                  <span>{moment(video.snippet.publishedAt).fromNow()}</span>
                </span>
              </>
            ))}

          {(searchScreen || subscriptionScreen) && (
            <p
              className='videoHorizontal__desc'
              style={{ fontSize: '13px', fontWeight: 500 }}
            >
              {video.snippet.description}
            </p>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
