import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getCommentsOfVideo } from '../../redux/actions/comment';
import Comment from '../comment';
import './style.scss';

const Comments = ({ videoId, commentCount }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  useEffect(() => {
    if (videoId) dispatch(getCommentsOfVideo(videoId));
  }, [videoId, dispatch]);
  const user = useSelector((state) => state.auth.user);

  const comments = useSelector((state) => state.commentReducer.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(videoId, text));
    setText('');
  };

  return (
    <div className='comments'>
      <p>{commentCount} comments</p>
      <div className='comments__form d-flex w-100 my-2'>
        <img src={user?.photoURL} alt='' className='rounded-circle mr-3' />
        <form className='d-flex flex-grow-1' onSubmit={handleComment}>
          <input
            type='text'
            className='flex-grow-1'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Write a comment...'
          />
          <button type='submit' disabled={text === ''} className='border-0 p-2'>
            Comment
          </button>
        </form>
      </div>
      <div className='comment__list'>
        {_comments?.map((x, index) => {
          return <Comment key={index} comment={x} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
