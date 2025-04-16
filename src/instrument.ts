import * as Sentry from '@sentry/react';
import React from 'react';
import {
  createBrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 0.1,
  enabled: import.meta.env.MODE !== 'development',
});

export const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouterV7(createBrowserRouter);
