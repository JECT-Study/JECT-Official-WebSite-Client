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

import { initializeUTMTracking } from "@/utils/analytics";

// 루트 페이지에서 새로고침 시 항상 최상단으로 이동
if (window.location.pathname === "/") {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, undefined, {
  autocapture: { elementInteractions: true },
});

amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

// UTM 파라미터 추적 초기화 (인스타그램 등 유입 경로 추적)
initializeUTMTracking();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
