import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './style.scss';

const PlayListVideo = ({ video }) => {
  const history = useHistory();
  const seconds = moment.duration(video.contentDetails?.duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  return (
    <Row
      className='playListVideo'
      onClick={() => history.push(`/watch/${video.id}`)}
    >
      <Col xs={6} md={4} lg={3} style={{ position: 'relative' }}>
        <img
          className='playListVideo__img'
          src={video.snippet.thumbnails.medium.url}
          alt=''
        />
        <span className='playListVideo__duration'>{_duration}</span>
      </Col>
      <Col xs={6} md={8} lg={9}>
        <p className='playListVideo__title'>{video.snippet.title}</p>
        <span className='playListVideo__channelTitle'>
          {video.snippet.channelTitle}
        </span>
      </Col>
    </Row>
  );
};

export default PlayListVideo;
