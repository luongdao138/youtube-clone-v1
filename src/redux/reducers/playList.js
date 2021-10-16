import * as types from '../constants';

export const playListReducer = (
  state = {
    videos: [],
    loading: false,
    total: 0,
    nextPageToken: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.PLAYLIST_REQUEST:
      return { ...state, loading: true };
    case types.PLAYLIST_SUCCESS:
      return {
        ...state,
        videos: payload.videos,
        loading: false,
        total: payload.total,
        nextPageToken: payload.nextPageToken,
      };
    case types.PLAYLIST_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
