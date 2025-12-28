import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import CycleSection from "@/components/main/sections/CycleSection";
import HeroSection from "@/components/main/sections/HeroSection";
import IntroSection from "@/components/main/sections/IntroSection";
import JoinSection from "@/components/main/sections/JoinSection";

// 섹션별 스크롤 트리거 설정 (아래로 스크롤 시)
const getForwardTriggers = () => {
  const isDesktop = window.matchMedia("(min-width: 1200px)").matches;
  const isTablet = window.matchMedia("(min-width: 768px)").matches;

  if (isDesktop) {
    return [
      { start: "70% top" },
      { start: "90% top" },
      { start: "70% top" },
    ];
  } else if (isTablet) {
    return [
      { start: "70% top" },
      { start: "85% top" },
      { start: "70% top" },
    ];
  } else {
    return [
      { start: "60% top" },
      { start: "80% top" },
      { start: "60% top" },
    ];
  }
};

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isScrolling = false;

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    const scrollToPrevSection = (currentSection: Element) => {
      const prevSection = currentSection.previousElementSibling;
      if (!isScrolling && prevSection) {
        isScrolling = true;
        disableScroll();
        gsap.to(window, {
          scrollTo: prevSection,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              isScrolling = false;
              enableScroll();
            }, 300);
          },
        });
      }
    };

    const forwardTriggers = getForwardTriggers();

    const context = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll("section");
      if (!sections) return;

      // 다음 섹션으로 스크롤 (아래로 스크롤 시)
      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: forwardTriggers[index].start,
            end: "bottom top",
            onEnter: () => {
              if (!isScrolling && section.nextElementSibling) {
                isScrolling = true;
                disableScroll();
                gsap.to(window, {
                  scrollTo: section.nextElementSibling,
                  duration: 1,
                  ease: "power2.inOut",
                  onComplete: () => {
                    setTimeout(() => {
                      isScrolling = false;
                      enableScroll();
                    }, 300);
                  },
                });
              }
            },
          });
        }
      });
    }, containerRef);

    // 휠 이벤트로 위로 스크롤 감지 (섹션 높이가 뷰포트보다 작은 경우 대응)
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const sections = containerRef.current?.querySelectorAll("section");
      if (!sections) return;

      // 위로 스크롤 (deltaY < 0)
      if (e.deltaY < 0) {
        sections.forEach((section, index) => {
          if (index > 0) {
            const rect = section.getBoundingClientRect();
            // 현재 섹션이 뷰포트 상단 근처에 있고, 위로 스크롤 중인 경우
            if (rect.top >= -50 && rect.top <= 50) {
              scrollToPrevSection(section);
            }
          }
        });
      }
    };

    // 터치 이벤트로 위로 스크롤 감지 (모바일 대응)
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      const sections = containerRef.current?.querySelectorAll("section");
      if (!sections) return;

      // 위로 스와이프 (deltaY < 0, 즉 손가락이 아래로 이동)
      if (deltaY < -30) {
        sections.forEach((section, index) => {
          if (index > 0) {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -50 && rect.top <= 50) {
              scrollToPrevSection(section);
              touchStartY = touchCurrentY; // 리셋하여 중복 트리거 방지
            }
          }
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      context.revert();
      enableScroll();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className='scroll flex flex-col'>
      <HeroSection />
      <IntroSection />
      <CycleSection />
      <JoinSection />
    </div>
  );
};

export default Main;
