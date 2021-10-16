import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getPopularVideos,
  getVideosByKeywords,
} from '../../redux/actions/video';
import './style.scss';

const CategoryBar = () => {
  const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder',
    'Shwetabh',
    'Premier league',
  ];

  const [activeElement, setActiveElement] = useState('All');
  const dispatch = useDispatch();

  const handleClick = (value) => {
    setActiveElement(value);
    if (value === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByKeywords(value));
    }
  };

  return (
    <div className='categoryBar'>
      {keywords.map((x, index) => {
        return (
          <span
            className={activeElement === x ? 'active' : ''}
            onClick={() => handleClick(x)}
            key={index}
          >
            {x}
          </span>
        );
      })}
    </div>
  );
};

export default CategoryBar;
