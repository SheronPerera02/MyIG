import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  users: [],
  posts: [],
  composeChatList: [],
  chatHeadList: [],
  messages: [],
};

const getAllUsersSuccess = (state, action) => {
  return updateObject(state, {users: action.users});
};

const getAllPostsSuccess = (state, action) => {
  return updateObject(state, {posts: action.posts});
};

const getComposeChatListSuccess = (state, action) => {
  return updateObject(state, {composeChatList: action.composeChatList});
};

const setMessages = (state, action) => {
  return updateObject(state, {messages: action.messages});
};

const getChatHeadListSuccess = (state, action) => {
  return updateObject(state, {chatHeadList: action.chatHeadList});
};

const authLogout = (state, action) => {
  return updateObject(state, {
    users: [],
    posts: [],
    composeChatList: [],
    chatHeadList: [],
    messages: [],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return getAllUsersSuccess(state, action);
    case actionTypes.GET_ALL_POSTS_SUCCESS:
      return getAllPostsSuccess(state, action);
    case actionTypes.GET_COMPOSE_CHAT_LIST_SUCCESS:
      return getComposeChatListSuccess(state, action);
    case actionTypes.SET_MESSAGES:
      return setMessages(state, action);
    case actionTypes.GET_CHAT_HEAD_LIST_SUCCESS:
      return getChatHeadListSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
