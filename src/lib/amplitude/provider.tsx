import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import { useEffect, ReactNode } from 'react';

import { AmplitudeContext } from './context';
import { EventCategory, EventAction, EventProperties } from './types';

interface AmplitudeProviderProps {
  children: ReactNode;
}

const AMPLITUDE_API_KEY = (import.meta.env.VITE_AMPLITUDE_API_KEY as string) || '';

export function AmplitudeProvider({ children }: AmplitudeProviderProps) {
  useEffect(() => {
    if (!AMPLITUDE_API_KEY) {
      console.warn(
        'Amplitude API 키가 설정되지 않았습니다. 환경 변수 VITE_AMPLITUDE_API_KEY를 확인하세요.',
      );
      return;
    }

    amplitude.init(AMPLITUDE_API_KEY, {
      autocapture: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
      trackingOptions: {
        ipAddress: true,
        language: true,
        platform: true,
      },
    });

    amplitude.add(sessionReplayPlugin());
  }, []);

  const trackEvent = (
    category: EventCategory,
    action: EventAction,
    properties: EventProperties = {},
  ): void => {
    if (!AMPLITUDE_API_KEY) {
      return;
    }

    const eventName = `${category}_${action}`;
    amplitude.track(eventName, properties);
  };

  const contextValue = {
    trackEvent,
  };

  return <AmplitudeContext.Provider value={contextValue}>{children}</AmplitudeContext.Provider>;
}
