import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import {
  channelReducer,
  channelVideosReducer,
  subscribedChannelsReducer,
} from './reducers/channel';
import commentReducer from './reducers/comment';
import { playListReducer } from './reducers/playList';
import homeReducer from './reducers/video';
import {
  videoDetailReducer,
  relatedVideoReducer,
  searchVideosReducer,
} from './reducers/videoDetail';

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeReducer,
  videoDetail: videoDetailReducer,
  channelDetail: channelReducer,
  commentReducer: commentReducer,
  relatedVideos: relatedVideoReducer,
  searchVideos: searchVideosReducer,
  subscribedChannels: subscribedChannelsReducer,
  channelVideos: channelVideosReducer,
  playList: playListReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
