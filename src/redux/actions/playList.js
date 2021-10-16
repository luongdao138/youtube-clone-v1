import axios from '../../api';
import * as types from '../constants';

export const getPlayList = (type) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.PLAYLIST_REQUEST,
    });
    let res;
    if (type === 'LL') {
      res = await axios.get('/videos', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: 5,
          myRating: 'like',
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
    } else if (type == 'WL') {
      res = await axios.get('/playlists', {
        params: {
          part: 'snippet,contentDetails',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
    }

    dispatch({
      type: types.PLAYLIST_SUCCESS,
      payload: {
        videos: res.data.items,
        total: res.data.pageInfo.totalResults,
        nextPageToken: res.data.nextPageToken,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.PLAYLIST_FAILURE,
      payload: error.message,
    });
  }
};
