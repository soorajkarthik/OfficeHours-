import React from 'react';
import { Video } from '@andyet/simplewebrtc';

class VideoRoom extends React.Component {
    render() {
        let local = this.props.localMedia[1]
        let remote = []
        for (let i = 0; i < this.props.remoteMedia.length; i++) {
            if (this.props.remoteMedia[i].kind === "video") {
                remote.push(<Video media={this.props.remoteMedia[i]}/>)
            }
        }
        return (<div>
            <Video media={local}/>
            {remote}
        </div>)
    }
}

export default VideoRoom;