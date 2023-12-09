import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { useTelegram } from "./Components/Hooks/useTelegram";
import { BrowserRouter as Router } from "react-router-dom";

const { tg } = useTelegram();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        {Telegram.WebApp.setHeaderColor('secondary_bg_color')}
        {tg.expand()}
        {tg.enableClosingConfirmation()}
        <App />
      </Router>
  </React.StrictMode>,
)
