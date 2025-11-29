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
  const getDeviceType = useCallback(
    (width: number): DeviceType => {
      if (width >= breakpoints.desktop.min && width <= breakpoints.desktop.max) {
        return "desktop";
      }
      if (width >= breakpoints.tablet.min && width <= breakpoints.tablet.max) {
        return "tablet";
      }
      return "mobile";
    },
    [breakpoints],
  );

  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window === "undefined") return "desktop";
    return getDeviceType(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const newDeviceType = getDeviceType(window.innerWidth);
      setDeviceType(newDeviceType);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getDeviceType]);

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
