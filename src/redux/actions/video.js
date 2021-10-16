import {
  CHECK_RATING_SUCCESS,
  HOME_VIDEOS_FAILURE,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAILURE,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_REQUEST,
  SEARCH_VIDEOS_SUCCESS,
  SELECT_VIDEO_FAILURE,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
} from '../constants';
import axios from '../../api';

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const res = await axios.get('/videos', {
      params: {
        part: 'snippet',
        // regionCode: 'VN',
        chart: 'mostPopular',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: 'All',
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOME_VIDEOS_FAILURE,
      payload: error.message,
    });
  }
};

export const getVideosByKeywords = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const res = await axios.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });
    console.log(res);

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: keyword,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOME_VIDEOS_FAILURE,
      payload: error.message,
    });
  }
};

export const getVideoById = (videoId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELECT_VIDEO_REQUEST,
    });
    const res = await axios.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoId,
      },
    });
    console.log(res);

    dispatch({
      type: SELECT_VIDEO_SUCCESS,
      payload: res.data.items[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELECT_VIDEO_FAILURE,
      payload: error.message,
    });
  }
};

export const getRelatedVideos =
  (videoId, isNew) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RELATED_VIDEOS_REQUEST,
      });
      const res = await axios.get('/search', {
        params: {
          part: 'snippet',
          relatedToVideoId: videoId,
          maxResults: 10,
          type: 'video',
          pageToken: getState().relatedVideos.nextPageToken,
        },
      });
      console.log(res);

      dispatch({
        type: RELATED_VIDEOS_SUCCESS,
        payload: {
          videos: res.data.items,
          nextPageToken: res.data.nextPageToken,
          isNew,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RELATED_VIDEOS_FAILURE,
        payload: error.message,
      });
    }
  };

export const getVideosBySearch = (searchTerm) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEOS_REQUEST,
    });

    const res = await axios.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: searchTerm,
        type: 'video,channel',
      },
    });

    dispatch({
      type: SEARCH_VIDEOS_SUCCESS,
      payload: res.data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELECT_VIDEO_FAILURE,
      payload: error.message,
    });
  }
};

export const checkVideoRating = (videoId) => async (dispatch, getState) => {
  try {
    const res = await axios.get('/videos/getRating', {
      params: {
        id: videoId,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(res.data);
    dispatch({
      type: CHECK_RATING_SUCCESS,
      payload: res.data.items[0].rating,
    });
  } catch (error) {
    console.log(error);
  }
};

export const rateVideo = (videoId, rating) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      '/videos/rate',
      {},
      {
        params: {
          id: videoId,
          rating,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      }
    );
    console.log(res.data);
    setTimeout(() => {
      dispatch(checkVideoRating(videoId));
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
