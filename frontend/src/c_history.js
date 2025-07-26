import React from 'react';

const ConversationHistory = ({ conversations }) => {
  return (
    <div className="conversation-history">
      <h3>Conversations</h3>
      <ul>
        {conversations.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistory;