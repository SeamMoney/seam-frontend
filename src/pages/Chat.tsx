import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { IoMdSend } from 'react-icons/io'; 
interface Message {
  text: string;
  sender: 'User' | 'MoveGPT';
}

// Load CHAT_URL from .env file
const CHAT_URL = process.env.CHAT_URL || 'http://localhost:3022';

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const question = input;
    setMessages((prevMessages) => [...prevMessages, { text: question, sender: 'User' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post<{ answer: string }>(`${CHAT_URL}/generate-response`, { question });
      const { answer } = response.data;
      setMessages((prevMessages) => [...prevMessages, { text: answer, sender: 'MoveGPT' }]);
    } catch (error) {
      console.error('Error while fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container text-white">
      <ul className="messages-list">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`message ${message.sender === 'User' ? 'user-message' : 'movegpt-message bg-black'}`}
            style={{
              backgroundColor: message.sender === 'User' ? 'lightblue' : 'bg-black',
              borderRadius: '5px',
              padding: '5px',
              margin: '5px 0',
            }}
          >
            {message.text}
          </li>
        ))}

      </ul>
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <form onSubmit={handleSubmit} className="message-input-form flex flex-row items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="message-input bg-black text-white seam-outline"
          style={{ width: '100%' }}
          placeholder="Type your message..."
        />
          <button type="submit" className="bg-white bg-opacity-25 rounded-md p-2 m-1 h-10 w-10 " >
          <IoMdSend size={24} /> {/* Add the icon */}
        </button>
        
      </form>
      
    </div>
  );
};

export default Chat;
