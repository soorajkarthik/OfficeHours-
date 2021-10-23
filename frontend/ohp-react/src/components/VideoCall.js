import React from "react";
import ChatSection from "./ChatSection";
import VideoSection from "./VideoSection";
import * as webRTC from '@andyet/simplewebrtc';
import { WEB_RTC_API_KEY } from "../environment";

const API_KEY = WEB_RTC_API_KEY;

let url = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

class VideoCall extends React.Component {
    render() {
        // roomName will probably be a prop later
        const { roomName } = this.props;
        return (
            <webRTC.Provider configUrl={url}>
                {/* Render based on the connection state */}
                <webRTC.Connecting>
                    <h1>Connecting...</h1>
                </webRTC.Connecting>
            
                <webRTC.Connected>
                    {/* Request the user's media */}
                    <webRTC.RequestUserMedia audio video auto />
            
                    {/* Enable playing remote audio. */}
                    <webRTC.RemoteAudioPlayer />
            
                    {/* Connect to a room with a name */}
                    <webRTC.Room name={roomName}>
                        {props => {
                            return (<div>
                                <VideoSection localMedia={props.localMedia} remoteMedia={props.remoteMedia}/>
                                <ChatSection roomAddress={props.room.address}/>
                            </div>)
                        }}
                        
                    </webRTC.Room>
                </webRTC.Connected>
            </webRTC.Provider>
        )
    }
}
export default VideoCall;