import { Provider } from 'react-redux';
import VideoCall from './components/VideoCall'
import React from 'react';
import ReactDOM from 'react-dom';
import * as webRTC from '@andyet/simplewebrtc';


const store = webRTC.createStore();

ReactDOM.render(
  <Provider store={store}>
    <VideoCall />
  </Provider>,
  document.getElementById('root')
);