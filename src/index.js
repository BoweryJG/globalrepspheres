import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import PodcastPage from './PodcastPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AdminAnalyticsPage from './AdminAnalyticsPage';
import AuthCallback from './AuthCallback';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import { initAnalytics } from './analytics';

const root = ReactDOM.createRoot(document.getElementById('root'));

initAnalytics();

root.render(
  <React.StrictMode>
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/podcast.html" element={<PodcastPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin-analytics" element={<AdminAnalyticsPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();