import axios from '../../api';
import * as types from '../constants';

export const getChannelById = (channelId) => async (dispatch) => {
  try {
    dispatch({
      type: types.CHANNEL_DETAIL_REQUEST,
    });

    const res = await axios.get('/channels', {
      params: {
        part: 'snippet, statistics, contentDetails',
        id: channelId,
      },
    });

    dispatch({
      type: types.CHANNEL_DETAIL_SUCCESS,
      payload: res.data.items[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CHANNEL_DETAIL_FAILURE,
      payload: error.message,
    });
  }
};

export const checkSubscriptionStatus =
  (channelId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.CHECK_SUBSCRIPTION_REQUEST,
      });

      const res = await axios.get('/subscriptions', {
        params: {
          part: 'id,snippet',
          forChannelId: channelId,
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });

      dispatch({
        type: types.CHECK_SUBSCRIPTION_SUCCESS,
        payload: {
          status: res.data.items.length !== 0,
          subscriptionId: res.data.items[0]?.id,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.CHECK_SUBSCRIPTION_FAILURE,
      });
    }
  };

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.SUBSCIBED_CHANNEL_REQUEST,
    });

    const res = await axios.get('/subscriptions', {
      params: {
        part: 'snippet',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: types.SUBSCIBED_CHANNEL_SUCCESS,
      payload: res.data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.SUBSCIBED_CHANNEL_FAILURE,
      payload: error.message,
    });
  }
};

export const getVideosOfChannel = (channelId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.CHANNEL_VIDEOS_REQUEST,
    });

    // get upload playlist id
    const res = await axios.get('/channels', {
      params: {
        part: 'contentDetails',
        id: channelId,
      },
    });

    const uploadPlaylistId =
      res.data.items[0].contentDetails.relatedPlaylists.uploads;
    const res2 = await axios.get('/playlistItems', {
      params: {
        part: 'contentDetails,snippet',
        playlistId: uploadPlaylistId,
        maxResults: 1,
      },
    });

    dispatch({
      type: types.CHANNEL_VIDEOS_SUCCESS,
      payload: res2.data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CHANNEL_VIDEOS_FAILURE,
      payload: error.message,
    });
  }
};

export const subscribeChannel = (channelId) => async (dispatch, getState) => {
  try {
    const data = {
      snippet: {
        resourceId: { channelId },
      },
    };
    const res = await axios.post('/subscriptions', data, {
      params: {
        part: 'id, snippet',
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(res.data);
    setTimeout(() => {
      dispatch(checkSubscriptionStatus(channelId));
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

export const unsubscribeChannel =
  (subscriptionId, channelId) => async (dispatch, getState) => {
    try {
      const res = await axios.delete('/subscriptions', {
        params: {
          id: subscriptionId,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      console.log(res.data);
      setTimeout(() => {
        dispatch(checkSubscriptionStatus(channelId));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
