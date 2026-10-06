import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/fonts.css';
import './styles/global.css';
import './styles/header.css'

const container = document.getElementById('root');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
