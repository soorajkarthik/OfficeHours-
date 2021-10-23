import React from "react";

class ChatBox extends React.Component {
    render() {
        const {chats, peer} = this.props;
        return (<div key={chats[0].id}>
            <text>NAME
                {chats.map(function(message) {
                    return (<p key={message.id}>
                        {message.body}
                    </p>)
                })}
            </text>
        </div>);
    }
}

export default ChatBox