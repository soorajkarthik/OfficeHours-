import React from 'react';
import ChatBox from './ChatBox';
import '../styles/ChatSection.css'
import { ChatInput, ChatList, ChatComposers, ChatInputTextArea } from '@andyet/simplewebrtc';

class ChatSection extends React.Component {
    render() {
        const {roomAddress} = this.props;
        return (<div class="chatDiv">
                    <div className="chatList">
                        <ChatList
                            room={roomAddress}
                            renderGroup={({chats, peer}) => {
                                return <ChatBox key={chats[0].id} chats={chats} peer={peer}/>;
                            }}
                        />
                    </div>
                    <ChatInput
                        autoFocus
                        room={roomAddress}
                        placeholder="Chat"
                        render={chatProps => {
                            return (<div class="chatInputArea">
                                <ChatInputTextArea {...chatProps} />
                                <button onClick={chatProps.sendMessage}>
                                    <span>Send</span>
                                </button>
                            </div>)
                        }}
                        className="chatInput"
                    />
                    <ChatComposers room={roomAddress} className="chatComp"/>
                </div>)
    }
}

export default ChatSection;