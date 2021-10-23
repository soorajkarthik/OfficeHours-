import React from 'react';
import VideoRoom from './VideoRoom';
import * as webRTC from '@andyet/simplewebrtc';
import { WEB_RTC_API_KEY } from '../environment';

const API_KEY = WEB_RTC_API_KEY;

let roomName = prompt("Enter a room name:");
let url = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

class VideoSection extends React.Component {
    render() {
        return (
        <webRTC.Provider configUrl={url}>
          {/* Render based on the connection state */}
          <webRTC.Connecting>
            <h1>Connecting...</h1>
          </webRTC.Connecting>
    
          <webRTC.Connected>
            {console.log("Connected")}
            <h1>Connected!</h1>
            {/* Request the user's media */}
            <webRTC.RequestUserMedia audio video auto />
    
            {/* Enable playing remote audio. */}
            <webRTC.RemoteAudioPlayer />
    
            {/* Connect to a room with a name and optional password */}
            <webRTC.Room name={roomName}>
              {props => {
                return <VideoRoom localMedia={props.localMedia} remoteMedia={props.remoteMedia}/>
              }}
            </webRTC.Room>
          </webRTC.Connected>
        </webRTC.Provider>);
    }
}

export default VideoSection;