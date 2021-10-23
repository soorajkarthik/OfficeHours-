import React from 'react';
import ChatBox from './ChatBox';
import '../styles/ChatSection.css'
import { ChatInput, ChatGroup, ChatList, ChatComposers, ChatInputTextArea, Chat } from '@andyet/simplewebrtc';

class ChatSection extends React.Component {
    render() {
        const {roomAddress} = this.props;
        return (<div class="chatDiv">
                    <ChatList
                        room={roomAddress}
                        renderGroup={({chats, peer}) => {
                            return <ChatBox key={chats[0].id} chats={chats} peer={peer}/>;
                        }}
                    />
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
                        }
                    }
                    />
                    <ChatComposers room={roomAddress} />
                </div>)
    }
}

export default ChatSection;