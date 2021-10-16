import * as types from '../constants';

const initState = {
  loading: false,
  channel: null,
  subscriptionStatus: false,
  subscriptionId: null,
};

export const channelReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CHANNEL_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CHANNEL_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        channel: payload,
      };
    case types.CHANNEL_DETAIL_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CHECK_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionStatus: payload.status,
        subscriptionId: payload.subscriptionId,
      };
    default:
      return state;
  }
};

export const subscribedChannelsReducer = (
  state = {
    loading: false,
    channels: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case types.SUBSCIBED_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SUBSCIBED_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        channels: payload,
      };
    case types.SUBSCIBED_CHANNEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const channelVideosReducer = (
  state = {
    loading: false,
    videos: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case types.CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case types.CHANNEL_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
