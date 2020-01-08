import {combineReducers} from 'redux';
import data from './data';

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
}

const loading = (loading = false, action) => {
  if (action.type.indexOf('STARTED') != -1) {
    loading = true
  }
  else {
    loading = false
  }
  return loading
}

const forumState = (forumState = {full: [], selected: null, error: null}, action) => {
  if (action.type === 'GET_FORUM_SUCCESS') {
    return { ...forumState, 
      full: action.payload,
      error: null};
  }
  if (action.type === 'NEW_COMMENT_SUCCESS') {
    return {
      ...forumState,
      selected: action.payload,
      error: null
    }
  }
  if (action.type === 'DISPLAY_POST') {
    return {
      ... forumState,
      selected: forumState.full.find(x => x._id == action.payload),
      error: null
    }
  }
  if (action.type === 'GET_FORUM_FAILURE' || action.type === "NEW_COMMENT_FAILURE") {
    return { ...forumState, 
      error: action.payload};
  }
  return forumState;
}

const userState = (userState={isLoggedIn: false, loginAttempted: 0, userData: {}, jwt: "", errorMessage: null}, action) => {
  if (action.type === 'LOG_IN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
    localStorage.setItem("CachedJWT", action.payloadJWT)
    return { ...userState, 
      isLoggedIn: true,
      loginAttempted: 0,
      userData: action.payload,
      jwt: action.payloadJWT,
      errorMessage: null};
  }
  if (action.type === 'UPDATE_SUCCESS') {
    return { ...userState, 
      userData: action.payload};
  }
  if (action.type === 'UPDATE_FAILURE') {
    return { ...userState};
  }
  if (action.type === 'FACEBOOK_LOGIN_SUCCESS') {
    return { ...userState, 
      isLoggedIn: true,
      loginAttempted: 0,
      userData: action.payload,
      jwt: "",
      errorMessage: null};
  }
  if (action.type === 'LOG_IN_FAILURE') {
    localStorage.removeItem("CachedJWT")
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: userState.loginAttempted + 1,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'REGISTER_FAILURE' || action.type === 'RESET_FAILURE' || action.type === 'RESET_SUCCESS') {
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'LOG_OUT') {
    localStorage.removeItem("CachedJWT")
    userState.isLoggedIn = false;
    userState.loginAttempted = 0;
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: ""};
  }
  return userState;
}

const newsStore = (news = [], action) => {
  if(action.type === "LOAD_NEWS") {
    return action.payload;
  }
  return news;
}

export default combineReducers ({
  pageNum: currentPageNumber,
  data,
  news: newsStore,
  userState: userState,
  loading: loading,
  forumState: forumState
  //anotherKey: anotherReducer (all your reducers should be combined)
});
