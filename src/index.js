import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import { firebaseMiddleware, skipPreviousAnimations } from './firebase';

const store = applyMiddleware(
  firebaseMiddleware,
  skipPreviousAnimations
)(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
