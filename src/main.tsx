import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens/index.js';
import './styles/global.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
