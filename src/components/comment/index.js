import moment from 'moment';
import React from 'react';
import './style.scss';
import parser from 'react-html-parser';

const Comment = ({ comment }) => {
  return (
    <div className='comment p-2 d-flex'>
      <img
        src={comment?.authorProfileImageUrl}
        alt=''
        className='rounded-circle mr-3'
      />
      <div className='comment__body'>
        <p className='comment__header mb-1'>
          {comment?.authorDisplayName}
          <span className='ml-1'>{moment(comment?.publishedAt).fromNow()}</span>
        </p>
        <div className='my-2'>{parser(comment?.textDisplay)} </div>
      </div>
    </div>
  );
};

export default Comment;
