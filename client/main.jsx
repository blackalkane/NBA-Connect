import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '/imports/ui/Layout/App';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../imports/reducers';
import thunk from 'redux-thunk';
import "bootstrap/dist/css/bootstrap.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

Meteor.startup(() => {
  render(<Provider store={createStore(reducers, applyMiddleware(thunk))}>
  <App />
  </Provider>, document.getElementById('react-target'));
});
