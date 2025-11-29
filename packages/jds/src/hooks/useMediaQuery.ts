import { useCallback, useEffect, useState } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

export interface Breakpoints {
  mobile: { min: number; max: number };
  tablet: { min: number; max: number };
  desktop: { min: number; max: number };
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
  mobile: { min: 320, max: 767 },
  tablet: { min: 768, max: 1199 },
  desktop: { min: 1200, max: 2560 },
};

/**
 * 현재 윈도우 너비를 기반으로 디바이스 타입을 반환합니다
 *
 * @param breakpoints - 커스텀 브레이크포인트 (선택)
 * @returns 'desktop' | 'tablet' | 'mobile'
 *
 * @example
 * 기본 사용
 * ```tsx
 * const deviceType = useMediaQuery();
 * if (deviceType === 'mobile') {
 *   // 모바일 레이아웃 렌더링
 * }
 * ```
 *
 * @example
 * 커스텀 브레이크포인트 사용
 * ```tsx
 * const deviceType = useMediaQuery({
 *   mobile: { min: 0, max: 639 },
 *   tablet: { min: 640, max: 1023 },
 *   desktop: { min: 1024, max: 9999 }
 * });
 * ```
 */
export const useMediaQuery = (breakpoints: Breakpoints = DEFAULT_BREAKPOINTS): DeviceType => {
  const getDeviceType = useCallback((): DeviceType => {
    if (typeof window === "undefined") return "desktop";

    const desktopQuery = window.matchMedia(`(min-width: ${breakpoints.desktop.min}px)`);
    const tabletQuery = window.matchMedia(
      `(min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
    );

    if (desktopQuery.matches) return "desktop";
    if (tabletQuery.matches) return "tablet";
    return "mobile";
  }, [breakpoints]);

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const desktopQuery = window.matchMedia(`(min-width: ${breakpoints.desktop.min}px)`);
    const tabletQuery = window.matchMedia(
      `(min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
    );

    const handleChange = () => {
      setDeviceType(getDeviceType());
    };

    desktopQuery.addEventListener("change", handleChange);
    tabletQuery.addEventListener("change", handleChange);

    return () => {
      desktopQuery.removeEventListener("change", handleChange);
      tabletQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoints, getDeviceType]);

  return deviceType;
};

/**
 * 각 디바이스 타입에 대한 boolean 값을 반환합니다
 *
 * @param breakpoints - 커스텀 브레이크포인트 (선택)
 * @returns 각 디바이스 타입에 대한 boolean 플래그 객체
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop } = useMediaQueryFlags();
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 * ```
 */
export const useMediaQueryFlags = (breakpoints?: Breakpoints) => {
  const deviceType = useMediaQuery(breakpoints);

  return {
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  };
};
