import * as types from '../constants';
const initState = {
  loading: false,
  video: null,
  rating: 'none',
};

export const videoDetailReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SELECT_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SELECT_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload,
      };

    case types.SELECT_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        video: null,
      };
    case types.CHECK_RATING_SUCCESS:
      return {
        ...state,
        rating: payload,
      };
    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = { loading: false, videos: [], nextPageToken: '' },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case types.RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload.isNew
          ? payload.videos
          : [...state.videos, ...payload.videos],
        nextPageToken: payload.nextPageToken,
        loading: false,
      };
    case types.RELATED_VIDEOS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const searchVideosReducer = (
  state = { loading: false, videos: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case types.SEARCH_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case types.SEARCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
