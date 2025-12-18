import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import CycleSection from "@/components/main/cycleSection/CycleSection";
import HeroSection from "@/components/main/heroSection/HeroSection";
import IntroSection from "@/components/main/introSection/IntroSection";
import JoinSection from "@/components/main/joinSection/JoinSection";

// 섹션별 스크롤 트리거 설정
// start: 섹션의 해당 지점이 뷰포트의 해당 지점에 도달하면 트리거
const SECTION_TRIGGERS = [
  { start: "70% top", startBack: "30% bottom" },  // HeroSection: 70% 스크롤 시 다음으로
  { start: "90% top", startBack: "10% bottom" },  // IntroSection: 90% 스크롤 시 다음으로
  { start: "70% top", startBack: "30% bottom" },  // CycleSection: 70% 스크롤 시 다음으로
];

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

    const context = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll("section");
      if (!sections) return;

      // 다음 섹션으로 스크롤 (아래로 스크롤 시)
      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          const trigger = SECTION_TRIGGERS[index];
          ScrollTrigger.create({
            trigger: section,
            start: trigger.start,
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

      // 이전 섹션으로 스크롤 (위로 스크롤 시)
      sections.forEach((section, index) => {
        if (index > 0) {
          const trigger = SECTION_TRIGGERS[index - 1];
          ScrollTrigger.create({
            trigger: section,
            start: trigger.startBack,
            end: "top bottom",
            onEnterBack: () => {
              if (!isScrolling && section.previousElementSibling) {
                isScrolling = true;
                disableScroll();
                gsap.to(window, {
                  scrollTo: section.previousElementSibling,
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

    return () => {
      context.revert();
      enableScroll();
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
