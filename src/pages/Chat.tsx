import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { IoMdSend } from 'react-icons/io'; 
interface Message {
  text: string;
  sender: 'User' | 'MoveGPT';
}

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
    <li className="user-message message" style={{ backgroundColor: 'lightblue', borderRadius: '5px', padding: '5px', margin: '5px 0' }}>
      User: {text}
    </li>
  );
  
  const MoveGPTMessage: React.FC<{ text: string }> = ({ text }) => (
    <li className="movegpt-message message bg-black" style={{ backgroundColor: 'black', borderRadius: '5px', padding: '5px', margin: '5px 0' }}>
      Move GPT: {text}
    </li>
  );
  

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
        {messages.map((message, index) =>
          message.sender === 'User' ? (
            <UserMessage key={index} text={message.text} />
          ) : (
            <MoveGPTMessage key={index} text={message.text} />
          )
        )}
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
