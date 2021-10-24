import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { Provider } from 'react-redux';
import VideoCall from './components/VideoCall'
import React from 'react';
import * as webRTC from '@andyet/simplewebrtc';
import Login from './components/Login';
import Home from './components/Home'
import Register from './components/Register'
import NotFound from './components/404'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/call/:roomName" children={<VideoCallWrapper />} />
        <Route path="/call">
          <NotFound />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

function verifyValidRoom(roomName) {
  return true;
}


function VideoCallWrapper() {
  let { roomName } = useParams();

  const store = webRTC.createStore();

  if (verifyValidRoom(roomName)) {
    return (
      <Provider store={store}>
        <VideoCall roomName={roomName} />
      </Provider>
    );
  }

  else {
    return (<h1>lol rekt</h1>)
  }
}


export default App;

