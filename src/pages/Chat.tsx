import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {dapps} from 'data/dapps/dapp_data';
import { IoMdSend } from 'react-icons/io'; 
import { FiTrash2 } from 'react-icons/fi';
import {VscAccount,VscDebugRestart,VscHubot} from 'react-icons/vsc';
import WindowWrapper from 'components/etc/WindowWrapper';
import Select from "react-select";
interface Message {
  text: string;
  sender: 'User' | 'MoveGPT';
}
const BASE_MESSAGE = "text-left align-middle text-white text-lg"; 
// const 
const MESSAGE_CONTAINER = "flex flex-row justify-start items-left";
const GPT_MESSAGE_CONTAINER = `${MESSAGE_CONTAINER} bg-gray rounded-lg p-2 my-2`;
const CHAT_ICON = "text-2xl text-white mr-2";
const UserMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className={MESSAGE_CONTAINER}>
    <VscAccount className={CHAT_ICON}/>
    <p className={BASE_MESSAGE}>
      you: {text}
    </p>
    </div>
  );
  
  const MoveGPTMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className={GPT_MESSAGE_CONTAINER}>
      <VscHubot className={CHAT_ICON}/>
    <p className={BASE_MESSAGE}>
      {text}
    </p>
    </div>
  );
  
  const WelcomeText = `
  Welcome to Move GPT! Ask me anything about Move, the Aptos Blockchain, and I'll try my best to answer.`
  
    

  const WelcomeMessage = () => {
    const [toggle, setToggle] = useState<boolean>(true);
    if (toggle){
    return(
      <div className="welcome-message">
        <MoveGPTMessage text={WelcomeText} />
      </div>
    )}
    else return null;
  }

// Load CHAT_URL from .env file
const CHAT_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>('MoveGPT v0');

  const model_options = [
    {label:'MoveGPT v0', value:'MoveGPT v0'},
    {label:'MoveGPT + llama', value:'MoveGPT + llama'},
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
  
    const question = input;
    setMessages((prevMessages) => [...prevMessages, { text: question, sender: 'User' }]);
    setInput('');
    setIsLoading(true);
    console.log("question", question);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000" +'/chat', {
        "user_id": 'your_user_id',
        "convo_id": 'your_convo_id',
        "messages": [...messages,question]
      }, {
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      }
    });
  
      const answer = response.data;
      setMessages((prevMessages) => [...prevMessages, { text: answer, sender: 'MoveGPT' }]);
    } catch (error) {
      console.error('Error while fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  
  const ChatHeader = () => {
    const handleClearChat = () => {
      setMessages([]);
    };
  
    return (
      <div className="flex justify-between items-center p-2">
        
        <div className="flex items-center">
          <p className='text-bold text-2xl pl-2'>MoveGPT</p>
          
          {/* Add the dropdown for model selection here */}
        </div>
        <Select
          className="w-48"
          options={model_options}
          value={model_options.find((option) => option.value === selectedModel)}
          defaultValue={{ label: 'MoveGPT v0', value: 'MoveGPT v0' }}/>
        <button className="bg-transparent text-white" onClick={handleClearChat}>
          <FiTrash2 size={20} />
        </button>
      </div>
    );
  };
  return (
    <div className=" text-white">
      <WindowWrapper>
        <div className='h-128'>
          <ChatHeader />
       <ul className="messages-list">
        <WelcomeMessage />
        {messages.map((message, index) =>
          message.sender === 'User' ? (
            <UserMessage key={index} text={message.text} />
          ) : (
            <MoveGPTMessage key={index} text={message.text} />
          )
        )}
      </ul>
      </div>
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <form onSubmit={handleSubmit} className="message-input-form flex flex-row items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="message-input bg-black text-white seam-outline align-middle"
          style={{ width: '100%' }}
          placeholder="Type your message..."
        />
          <button type="submit" className="bg-white bg-opacity-25 rounded-md p-2 m-1 h-10 w-10 " >
          <IoMdSend size={24} /> {/* Add the icon */}
        </button>
        
      </form>
      
    </WindowWrapper>
    </div>
  );
};

export default Chat;
