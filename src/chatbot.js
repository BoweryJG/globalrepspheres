import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatbotPage from './ChatbotPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatbotPage />
  </React.StrictMode>
);

reportWebVitals();