import { useContext, useEffect } from 'react';

import { AmplitudeContext } from './context';
import { EventCategory } from './types';

/**
 * Amplitude Context를 사용하기 위한 커스텀 훅
 */
export function UseAmplitude() {
  const context = useContext(AmplitudeContext);

  if (context === undefined) {
    throw new Error('UseAmplitude must be used within an AmplitudeProvider');
  }

  return context;
}

/**
 * GNB 이벤트 트래킹을 위한 훅
 */
export function UseGnbTracking() {
  const { trackEvent } = UseAmplitude();

  return {
    trackMenuClick: (itemName: string) => {
      trackEvent('gnb', 'click', { item_name: itemName });
    },
  };
}

/**
 * 스크롤 이벤트 트래킹을 위한 훅
 */
export function UseScrollTracking(pageName: string) {
  const { trackEvent } = UseAmplitude();

  useEffect(() => {
    const getScrollDepth = (): number => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      return Math.floor((scrollTop / scrollHeight) * 100);
    };

    let lastTrackedDepth = 0;
    const depthThresholds = [25, 50, 75, 90];

    let isThrottling = false;

    const handleScroll = (): void => {
      const currentDepth = getScrollDepth();

      depthThresholds.forEach(threshold => {
        if (currentDepth >= threshold && lastTrackedDepth < threshold) {
          trackEvent('scroll', 'scroll_depth', {
            page_name: pageName,
            scroll_depth: threshold,
          });
          lastTrackedDepth = threshold;
        }
      });

      isThrottling = false;
    };

    const handleScrollThrottle = (): void => {
      if (!isThrottling) {
        window.requestAnimationFrame(() => {
          handleScroll();
        });
        isThrottling = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottle, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, [pageName, trackEvent]);
}

/**
 * 탭 클릭 이벤트 트래킹을 위한 훅
 */
export function UseTabTracking(
  category: Extract<EventCategory, 'project' | 'faq' | 'activity' | 'support'>,
) {
  const { trackEvent } = UseAmplitude();

  return {
    trackTabClick: (tabName: string) => {
      trackEvent(category, 'tab_click', { tab_name: tabName });
    },
  };
}

/**
 * 카드 클릭 이벤트 트래킹을 위한 훅
 */
export function UseCardTracking(category: Extract<EventCategory, 'project' | 'activity'>) {
  const { trackEvent } = UseAmplitude();

  return {
    trackCardClick: (cardId: string, additionalProps: Record<string, string | number> = {}) => {
      trackEvent(category, 'card_click', {
        card_id: cardId,
        ...additionalProps,
      });
    },
  };
}

/**
 * 버튼 클릭 이벤트 트래킹을 위한 훅
 */
export function UseButtonTracking(category: EventCategory) {
  const { trackEvent } = UseAmplitude();

  return {
    trackButtonClick: (buttonName: string, sectionName?: string) => {
      trackEvent(category, 'button_click', {
        button_name: buttonName,
        section_name: sectionName,
      });
    },
  };
}

/**
 * 포지션 탭 이벤트 트래킹을 위한 훅
 */
export function UsePositionTabTracking() {
  const { trackEvent } = UseAmplitude();

  return {
    trackPositionTabClick: (positionName: string) => {
      trackEvent('support', 'tab_click', {
        tab_name: positionName,
        section_name: 'positions',
      });
    },
  };
}

/**
 * 스낵바 CTA 버튼 클릭 이벤트 트래킹을 위한 훅
 */
export function UseSnackbarTracking() {
  const { trackEvent } = UseAmplitude();

  return {
    trackCTAClick: (buttonName: string) => {
      trackEvent('main', 'button_click', {
        button_name: buttonName,
        section_name: 'snackbar',
      });
    },
  };
}

/**
 * 지원하기 페이지 이벤트 트래킹을 위한 훅
 */
export function UseApplyTracking() {
  const { trackEvent } = UseAmplitude();

  return {
    trackAgreementView: (agreementType: string) => {
      trackEvent('apply', 'view', {
        section_name: 'agreement',
        item_name: agreementType,
      });
    },
    trackSubmitButtonClick: () => {
      trackEvent('apply', 'button_click', {
        button_name: '젝트 3기 지원하기',
        section_name: 'apply_form',
      });
    },
    trackPinReset: () => {
      trackEvent('apply', 'button_click', {
        button_name: 'pin_reset',
        section_name: 'apply_form',
      });
    },
  };
}

/**
 * 프로젝트 상세 페이지 이벤트 트래킹을 위한 훅
 */
export function UseProjectDetailTracking(projectId: string) {
  const { trackEvent } = UseAmplitude();

  return {
    trackServiceButtonClick: () => {
      trackEvent('project', 'button_click', {
        button_name: '서비스 바로가기',
        section_name: 'project_detail',
        card_id: projectId,
      });
    },
    trackDetailTabClick: (tabName: string) => {
      trackEvent('project', 'tab_click', {
        tab_name: tabName,
        section_name: 'project_detail',
      });
    },
  };
}
