import { Provider } from 'react-redux';
import VideoCall from './components/VideoCall'
import React from 'react';
import ReactDOM from 'react-dom';
import * as webRTC from '@andyet/simplewebrtc';


const store = webRTC.createStore();

let url = window.location.href;

let splitUrl = url.split('/');

function verifyValidRoom(roomName) {
  return true;
}

if (splitUrl.length > 1 && splitUrl[splitUrl.length - 2] === "call" && verifyValidRoom(splitUrl[splitUrl.length - 1])) {
  ReactDOM.render(
    <Provider store={store}>
      <VideoCall roomName={splitUrl[splitUrl.length - 1]}/>
    </Provider>,
    document.getElementById('root')
  );
}