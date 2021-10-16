import axios from '../../api';
import * as types from '../constants';

export const getCommentsOfVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_COMMENTS_REQUEST,
    });

    const res = await axios.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId,
      },
    });

    dispatch({
      type: types.GET_COMMENTS_SUCCESS,
      payload: res.data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_COMMENTS_FAILURE,
      payload: error.message,
    });
  }
};

export const addComment = (videoId, text) => async (dispatch, getState) => {
  try {
    const commentData = {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    const res = await axios.post('/commentThreads', commentData, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: types.ADD_COMMENT_SUCCESS,
    });

    setTimeout(() => {
      dispatch(getCommentsOfVideo(videoId));
    }, 4000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.ADD_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};
