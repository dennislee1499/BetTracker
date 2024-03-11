import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BetsContextProvider from './context/BetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BetsContextProvider>
      <App />
    </BetsContextProvider>
  </React.StrictMode>
);


