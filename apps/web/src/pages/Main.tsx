import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import HeroSection from "@/components/main/heroSection/HeroSection";
import IntroSection from "@/components/main/introSection/IntroSection";

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

      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "center top",
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

      sections.forEach((section, index) => {
        if (index > 0) {
          ScrollTrigger.create({
            trigger: section,
            start: "center bottom",
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
    </div>
  );
};

export default Main;
