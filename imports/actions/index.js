const axios = require('axios');
var sha256 = require('js-sha256');

var url = 'https://cpsc436basketballapi.herokuapp.com'
//var url = 'http://localhost:3001'

export const flipPage = newPage => {
  return {
    type: 'NEW_PAGE',
    payload: newPage  
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT'
  }
}

const loginSuccess = (data, jwt) => ({
  type: "LOG_IN_SUCCESS",
  payload: data,
  payloadJWT: jwt
});

const loginStarted = () => ({
  type: "LOG_IN_STARTED"
});

const loginFailure = error => ({
  type: "LOG_IN_FAILURE",
  payload: error
});

export const userUpdateDisplay = (email, password, name, team) => {
  return dispatch => {
    dispatch(updateStarted());
    axios
      .post(url + '/users/updateDisplay', {
        email: email,
        password: password,
        name: name,
        team: team
      })
      .then(res => {
        dispatch(updateSuccess(res.data));
      })
      .catch(err => {
        dispatch(updateFailure(err.response.data));
      });
  };
};

const updateStarted = () => ({
  type: "UPDATE_STARTED"
});

const updateFailure = error => ({
  type: "UPDATE_FAILURE",
  payload: error
});

const updateSuccess = (data) => ({
  type: "UPDATE_SUCCESS",
  payload: data
});

export const userUploadProfilePicture = (email, password, base64) => {
  return dispatch => {
    dispatch(updateStarted());
    axios
      .post(url + '/users/uploadProfile', {
        email: email,
        password: password,
        base64: base64
      })
      .then(res => {
        dispatch(updateSuccess(res.data));
      })
      .catch(err => {
        dispatch(updateFailure(err.response.data));
      });
  };
};

const uploadStarted = () => ({
  type: "UPLOAD_STARTED"
});

const uploadFailure = error => ({
  type: "UPLOAD_FAILURE",
  payload: error
});

const uploadSuccess = (data) => ({
  type: "UPLOAD_SUCCESS",
  payload: data
});

export const userLogIn = (email, password, jwt) => {
  if (password) {
    var hash = sha256.create();
    hash.update(password);
    password = hash.hex();
  }

  return dispatch => {
    dispatch(loginStarted());
    axios
      .post(url + '/users/login', {
        email: email,
        password: password,
        jwt: jwt
      })
      .then(res => {
        dispatch(loginSuccess(res.data, res.data.JWTToken));
      })
      .catch(err => {
        dispatch(loginFailure(err.response.data));
      });
  };
};

const registerSuccess = (data, jwt) => ({
  type: "REGISTER_SUCCESS",
  payload: data,
  payloadJWT: jwt
});

const registerStarted = () => ({
  type: "REGISTER_STARTED"
});

const registerFailure = error => ({
  type: "REGISTER_FAILURE",
  payload: error
});

export const userRegister = (email, password, displayName, favTeam) => {
  var hash = sha256.create();
  hash.update(password);
  password = hash.hex();

  return dispatch => {
    dispatch(registerStarted());
    // TODO: Figure out time out
    //setTimeout(dispatch(registerFailure("Timed out")), 5000)
    axios
      .post(url + '/users/register', {
        email: email,
        password: password,
        displayName: displayName,
        favTeam: favTeam
      })
      .then(res => {
        dispatch(registerSuccess(res.data, res.data.JWTToken));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data));
      });
    };
};

const resetStarted = () => ({
  type: "RESET_STARTED"
});

const resetFailure = error => ({
  type: "RESET_FAILURE",
  payload: error
});

export const userReset = (email) => {
  return dispatch => {
    dispatch(resetStarted());
    axios
      .post(url + '/users/reset', {
        email: email,
        passwordReset: true
      })
      .then(res => {
        dispatch(resetFailure(res.data));
      })
      .catch(err => {
        dispatch(resetFailure(err.response.data));
      });
  };
};

const facebookLoginSuccess = data => ({
  type: "FACEBOOK_LOGIN_SUCCESS",
  payload: data
});

export const facebookLogIn = (id, email, token) => {
  return dispatch => {
    dispatch(loginStarted());
    axios
      .post(url + '/users/fbLogin', {
        id: id,
        email: email,
        token: token
      })
      .then(res => {
        dispatch(facebookLoginSuccess(res.data));
      })
      .catch(err => {
        dispatch(loginFailure(err.response.data));
      });
  };
};

export const loadNews = (news) => {
  return {
    type:'LOAD_NEWS',
    payload: news.articles
  }
}

const getForumSuccess = data => ({
  type: "GET_FORUM_SUCCESS",
  payload: data
});

const getForumStarted = () => ({
  type: "GET_FORUM_STARTED"
});

const getForumFailure = error => ({
  type: "GET_FORUM_FAILURE",
  payload: error
});

export const getForumPosts = () => {
  return dispatch => {
    dispatch(getForumStarted());
    axios
      .get(url + '/discussion', {
      })
      .then(res => {
        dispatch(getForumSuccess(res.data));
      })
      .catch(err => {
        dispatch(getForumFailure(err.response.data));
      });
    };
};

export const displayForumPost = (id) => {
  return {
    type:'DISPLAY_POST',
    payload: id
  }
}

export const makeNewPost = (title, body, token) => {
  return dispatch => {
    dispatch(getForumStarted());
    axios
      .post(url + '/discussion', {
        body: body,
        title: title,
        token: token
      })
      .then(res => {
        dispatch(getForumSuccess(res.data));
      })
      .catch(err => {
        dispatch(getForumFailure(err.response.data));
      });
    };
};

const newCommentSuccess = data => ({
  type: "NEW_COMMENT_SUCCESS",
  payload: data
});

const newCommentStarted = () => ({
  type: "NEW_COMMENT_STARTED"
});

const newCommentFailure = error => ({
  type: "NEW_COMMENT_FAILURE",
  payload: error
});

export const makeNewComment = (id, body, token) => {
  return dispatch => {
    dispatch(newCommentStarted());
    axios
      .post(url + '/discussion' + '/' + id, {
        body: body,
        token: token
      })
      .then(res => {
        dispatch(newCommentSuccess(res.data));
      })
      .catch(err => {
        dispatch(newCommentFailure(err.response.data));
      });
    };
};

export const deleteComment = (postId, commentId, token) => {
  return dispatch => {
    dispatch(newCommentStarted());
    axios
      .delete(url + '/discussion' + '/' + postId + '/comment/' + commentId, {
        data: {token: token}
      })
      .then(res => {
        dispatch(newCommentSuccess(res.data));
      })
      .catch(err => {
        dispatch(newCommentFailure(err.response.data));
      });
    };
};

export const editComment = (postId, commentId, body, token) => {
  return dispatch => {
    dispatch(newCommentStarted());
    axios
      .patch(url + '/discussion' + '/' + postId + '/comment/' + commentId, {
        body: body,
        token: token
      })
      .then(res => {
        dispatch(newCommentSuccess(res.data));
      })
      .catch(err => {
        dispatch(newCommentFailure(err.response.data));
      });
    };
};
