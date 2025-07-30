import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import PodcastPage from './PodcastPage';
import SimpleLogin from './components/SimpleLogin';
import SignupPage from './SignupPage';
import AuthPage from './components/AuthPage';
import AdminAnalyticsPage from './AdminAnalyticsPage';
import AuthCallback from './AuthCallback';
import EliteApplicationPage from './pages/EliteApplicationPage';
import ROICalculatorPage from './pages/ROICalculatorPage';
import AccountPage from './pages/AccountPage';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import { initAnalytics } from './analytics';
import './utils/corsTest'; // Make CORS test available globally
import './utils/authDebug'; // Make auth debug available globally

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
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/simple-login" element={<SimpleLogin />} />
          <Route path="/admin-analytics" element={<AdminAnalyticsPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/elite-application" element={<EliteApplicationPage />} />
          <Route path="/roi-calculator" element={<ROICalculatorPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/canvas" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();