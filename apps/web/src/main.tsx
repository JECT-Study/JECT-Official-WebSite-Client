import "./instrument";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/tokens/index";
import "@/styles/global.css";

import App from "./App";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, undefined, {
  autocapture: { elementInteractions: true },
});

amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
