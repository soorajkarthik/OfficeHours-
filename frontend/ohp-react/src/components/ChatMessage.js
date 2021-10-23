import React from "react";
import '../styles/ChatMessage.css'

class ChatMessage extends React.Component {
    render() {
        const {name, messages} = this.props;

        return (<div className="chatMessageBlock">
            <p className="chatMessageName">{name}:</p>
            {messages.map(function(message) {
                return (<p key={message.id} className="chatMessageContent">{message.body}</p>)
            })}
        </div>)
    }
}

export default ChatMessage;