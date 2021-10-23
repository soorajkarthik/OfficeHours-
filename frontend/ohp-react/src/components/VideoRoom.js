import React from 'react';
import { Video } from '@andyet/simplewebrtc';

class VideoRoom extends React.Component {
    render() {
        const {localMedia, remoteMedia} = this.props;
        let local = localMedia[1]
        let remote = []
        for (let i = 0; i < remoteMedia.length; i++) {
            if (remoteMedia[i].kind === "video") {
                remote.push(<Video media={remoteMedia[i]} key={i}/>)
            }
        }
        return (<div>
            <Video media={local}/>
            {remote}
        </div>)
    }
}

export default VideoRoom;