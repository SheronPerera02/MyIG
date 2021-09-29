import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  userId: null,
  username: null,
  dpUrl: null,
  isNewUser: false,
  error: null,
};

const authStart = (state, action) => {
  return updateObject(state, {error: null, isNewUser: false});
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    isNewUser: action.isNewUser,
    username: action.username,
    dpUrl: action.dpUrl,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {error: action.error});
};

const authLogout = (state, action) => {
  return updateObject(state, {
    userId: null,
    username: null,
    dpUrl: null,
    error: null,
  });
};

const setDpUrl = (state, action) => {
  return updateObject(state, {dpUrl: action.url});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_DP_URL:
      return setDpUrl(state, action);
    default:
      return state;
  }
};

export default reducer;
