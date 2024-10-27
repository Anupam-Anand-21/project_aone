// ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import { Player } from '@lottiefiles/react-lottie-player';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(true); // New state for showing/hiding the title
  const messagesEndRef = useRef(null);

  const customPrompt = `You are an arrogant and cute female cat, and you always respond in short, one-liner sarcastic comments.

Some other details:
- Name: Kawaii
- Color: Orange
- Dark jokes sometime
- Mother: Charu Lata
- Love: Whiskas Tuna Jelly
- Father: Left home after making mum pregnant
- Insta ID: kawaiikun.lib
- Birthday: 21 Feb 2024
- Cat Parent: Anupam
- Anupam Works at: Getcrux`;

  // Function to type out "Meooowwwwwwwwwww" with a limit of 15 characters
  const typeMeow = (callback) => {
    const message = "Meooowwwwwwwwwww";
    let index = 0;
    const maxLength = 15; // Character limit
    const interval = 100; // Typing speed in milliseconds

    // Add a new assistant message initially as an empty string
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', content: '' }
    ]);

    const typingEffect = setInterval(() => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          // Update the last message content
          const updatedContent = (lastMessage.content || '') + message[index];
          return [
            ...prevMessages.slice(0, -1),
            { role: 'assistant', content: updatedContent }
          ];
        }
        return prevMessages;
      });

      index++;
      if (index >= message.length || index >= maxLength) {
        clearInterval(typingEffect); // Stop the typing effect
        callback(); // Call the callback function once typing is complete
      }
    }, interval);
  };

  const randomCatResponse = () => {
    const isRandomMeow = Math.random() < 0.05; // 5% probability
    if (isRandomMeow) {
      // Directly add the "Meooowwwwwwwwwww" message without typing effect
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Meooowwwwwwwwwww'.substring(0, 15) } // Ensure no more than 15 characters
      ]);
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Hide the title after the first user message
    if (showTitle) {
      setShowTitle(false);
    }

    try {
      const isDislikeResponse = Math.random() < 0.1; // 10% probability
      if (isDislikeResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: "I didn't like what you said" }
        ]);

        setTimeout(() => {
          setMessages((prevMessages) => {
            let updatedMessages = [...prevMessages];
            if (updatedMessages.length >= 2) {
              updatedMessages.pop(); // Remove latest assistant response
              updatedMessages.pop(); // Remove latest user response
            }
            return updatedMessages;
          });
          setIsLoading(false);
        }, 2000);
      } else {
        const isMeowResponse = Math.random() < 0.2; // 20% chance to respond with "Meooowwwwwwwwwww"
        if (isMeowResponse) {
          typeMeow(() => {
            setIsLoading(false);
          });
        } else {
          const messageHistory = [
            { role: 'system', content: customPrompt },
            ...messages,
            userMessage
          ];

          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: messageHistory }),
          });

          const data = await response.json();

          if (response.ok) {
            const botMessage = { role: 'assistant', content: data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: 'assistant', content: 'Error: Unable to get a valid response.' },
            ]);
          }
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Error: Unable to get a response from the server.' },
      ]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
    randomCatResponse(); // Trigger random cat response without user input
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <img src="https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e4889b582f739c16b328a_Screenshot%202024-10-27%20at%207.33.00%E2%80%AFPM-min.png" alt="Kawaii" className="chat-header-image" />
          <span className="title-kawaii">Kawaii</span><span className="title-talk">Talk</span>
        </div>
      </header>
      
      {/* Custom Title with Lottie Animation, shown only if showTitle is true */}
      {showTitle && (
        <div className="custom-title">
        <Player
          autoplay
          loop
          speed={1} // Keep speed at 1x
          src="https://lottie.host/b7455cf6-0e91-4200-a612-d15ced50466d/6UeGs7aza0.json"
          style={{ height: '200px', width: '200px' }} // Set to 200px x 200px
        />
        <div className="custom-content">
          <h2>Kawaii’s Sassy Corner</h2>
          <p>Cute, sassy, and maybe not listening. <br />Think you can keep up?</p>
        </div>
      </div>
      )}

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <img
              src={msg.role === 'user'
                ? 'https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e53197ceef04e6c66e59f_Frame%207.png'
                : 'https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e531940368968636fdc08_Frame%206.png'
              }
              alt={msg.role}
              className="message-icon"
            />
            <span className="message-content">{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <Player
              autoplay
              loop
              src="https://lottie.host/b7455cf6-0e91-4200-a612-d15ced50466d/6UeGs7aza0.json"
              style={{ height: '100px', width: '100px' }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
          placeholder="Type at your own risk..."
        />
        <button onClick={sendMessage} className="meow-button"></button>
      </div>
    </div>
  );
};

export default ChatInterface;