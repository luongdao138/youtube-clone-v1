import * as types from '../constants';

const initState = {
  comments: null,
  loading: false,
};

const commentReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: payload,
      };

    case types.GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default commentReducer;
