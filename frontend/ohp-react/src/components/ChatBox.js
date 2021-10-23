import React from "react";
import ChatMessage from "./ChatMessage";

class ChatBox extends React.Component {
    render() {
        const {chats, peer} = this.props;
        return <ChatMessage name="NAME" messages={chats}/>
    }
}

export default ChatBox