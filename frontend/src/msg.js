import React from 'react';

const Message = ({ sender, text }) => {
  const className = sender === 'user' ? 'user-message' : 'ai-message';
  return <div className={`message ${className}`}>{text}</div>;
};

export default Message;