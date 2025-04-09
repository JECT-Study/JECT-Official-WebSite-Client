import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/tokens/index';
import '@/styles/global.css';

import App from './App';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
