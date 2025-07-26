import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: 'user', text: userInput };
    setMessages([...messages, newMessage]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: userInput
      });

      const aiReply = { sender: 'bot', text: res.data.response };
      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </p>
        ))}
        {loading && <p><em>Bot is typing...</em></p>}
      </div>
      <input
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Ask something..."
        style={{ width: '80%', marginTop: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;