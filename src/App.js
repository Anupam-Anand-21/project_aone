// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import ChatInterface from './components/ChatInterface';
import Callback from './components/Callback'; // Import Callback component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/callback" element={<Callback />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
