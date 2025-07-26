import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSend }) => {
  return (
    <div className="chat-window">
      <h2>Chat with AI</h2>
      <MessageList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;