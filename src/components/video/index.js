import React, { useState } from 'react';
import './style.scss';
import { AiFillEye } from 'react-icons/ai';
import { useEffect } from 'react';
import axios from '../../api';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useHistory } from 'react-router-dom';

const Video = ({ video, channelScreen }) => {
  const {
    snippet: {
      id,
      channelTitle,
      thumbnails: {
        medium: { url },
      },
      title,
      publishedAt,
      channelId,
    },
    contentDetails,
  } = video;

  const [viewCount, setViewCount] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setchannelIcon] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  const history = useHistory();
  const _videoId =
    contentDetails?.videoId ||
    (video.id instanceof Object ? video.id.videoId : video.id);

  useEffect(() => {
    const getVideoDetail = async () => {
      const res = await axios.get('/videos', {
        params: {
          id:
            contentDetails?.videoId ||
            (video.id instanceof Object ? video.id.videoId : video.id),
          part: 'contentDetails,statistics',
        },
      });
      setDuration(res.data.items[0].contentDetails.duration);
      setViewCount(res.data.items[0].statistics.viewCount);
    };

    getVideoDetail();
  }, [id]);

  useEffect(() => {
    if (!channelScreen) {
      const getChannelIcon = async () => {
        const res = await axios.get('/channels', {
          params: {
            id: channelId,
            part: 'snippet',
          },
        });
        setchannelIcon(res.data.items[0].snippet.thumbnails.medium.url);
      };

      getChannelIcon();
    }
  }, [id, channelScreen]);

  const handleClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  return (
    <div className='video' onClick={handleClick}>
      <div className='video__top'>
        {/* <img src={url} alt='' /> */}
        <LazyLoadImage src={url} effect='blur' />
        <span className='video__top__duration'>{_duration}</span>
      </div>
      <div className='video__title'>{title}</div>
      <div className='video__details'>
        <span>
          <AiFillEye /> {numeral(viewCount).format('0.a')} views •
        </span>
        <span className='video__top mb-0 ml-1'>
          {moment(publishedAt).fromNow()}
        </span>
      </div>
      {!channelScreen && (
        <div className='video__channel'>
          {/* <img src={channelIcon} alt='' /> */}
          <LazyLoadImage src={channelIcon} effect='blur' />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
