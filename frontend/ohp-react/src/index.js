import { Provider } from 'react-redux';
import VideoSection from './components/VideoSection'
import React from 'react';
import ReactDOM from 'react-dom';
import * as webRTC from '@andyet/simplewebrtc';


const store = webRTC.createStore();

ReactDOM.render(
  <Provider store={store}>
    <VideoSection />
  </Provider>,
  document.getElementById('root')
);