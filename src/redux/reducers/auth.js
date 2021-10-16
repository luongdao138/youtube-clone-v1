import * as types from '../constants';

const initState = {
  accessToken: sessionStorage.getItem('ytc-access-token'),
  user: sessionStorage.getItem('ytc-user')
    ? JSON.parse(sessionStorage.getItem('ytc-user'))
    : null,
  loading: false,
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };

    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.LOAD_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case types.LOG_OUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
