import React from 'react';
import VideoRoom from './VideoRoom';



class VideoSection extends React.Component {
    render() {
        const {localMedia, remoteMedia} = this.props;
        return <VideoRoom localMedia={localMedia} remoteMedia={remoteMedia}/>
    }
}

export default VideoSection;