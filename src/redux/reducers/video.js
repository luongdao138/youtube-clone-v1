import * as types from '../constants';
const initState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  category: 'All',
};

const homeReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.HOME_VIDEOS_SUCCESS:
      console.log(payload);
      return {
        ...state,
        videos:
          state.category === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        category: payload.category,
        loading: false,
      };
    case types.HOME_VIDEOS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.CHANNEL_DETAIL_REQUEST:

    default:
      return state;
  }
};

export default homeReducer;
