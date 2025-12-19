import {
  GlobalNavigation,
  LabelButton,
  BlockButton,
  Logo,
  SegmentedControl,
  useGlobalNavigationVariant,
} from "@ject/jds";
import { useMediaQueryFlags } from "@ject/jds/hooks";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { JectMenu, JoinGuideMenu, ProgramMenu } from "./Menus";
import { Sidebar } from "./Sidebar";

import { useTheme } from "@/hooks/useTheme";

const GlobalNavigationBar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const variant = useGlobalNavigationVariant();
  const { isDesktop, isTablet, isMobile } = useMediaQueryFlags();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const isHomePage = location.pathname === "/";
  const textColor = variant === "empty" && isHomePage ? "text-white!" : "";
  const blockButtonColor = variant === "empty" && isHomePage ? "bg-[#E7E7F3]! text-[#191B24]!" : "";

  const handleThemeChange = (value: string) => {
    if (value === "light") {
      setLightTheme();
    } else if (value === "dark") {
      setDarkTheme();
    }
  };

  const handleOpenSidebar = () => setIsOpenSidebar(true);

  return (
    <div className='fixed inset-0 z-50'>
      <GlobalNavigation.Root variant={variant}>
        <Logo
          role='home'
          href='/'
          hierarchy='primary'
          height={isDesktop ? 16 : 14}
          className={`${textColor}`}
        />
        {!isMobile && <GlobalNavigation.Divider />}
        <GlobalNavigation.List>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic
                hierarchy='primary'
                size='md'
                suffixIcon='arrow-down-s-line'
                className={`${textColor}`}
              >
                젝트
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content offset={20}>
              <JectMenu />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic
                hierarchy='primary'
                size='md'
                suffixIcon='arrow-down-s-line'
                className={`${textColor}`}
              >
                프로그램
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content offset={20}>
              <ProgramMenu />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic
                hierarchy='primary'
                size='md'
                suffixIcon='arrow-down-s-line'
                className={`${textColor}`}
              >
                합류 가이드
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content offset={20}>
              <JoinGuideMenu />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
        <GlobalNavigation.List align='right'>
          <GlobalNavigation.Item>
            <BlockButton.Basic
              hierarchy='primary'
              size={isTablet ? "xs" : "sm"}
              onClick={() => void navigation("/")}
              className={`${blockButtonColor}`}
            >
              지원하기
            </BlockButton.Basic>
          </GlobalNavigation.Item>
          <div className='w-[120px]'>
            {variant === "solid" && (
              <SegmentedControl.Root value={theme} size='xs' onValueChange={handleThemeChange}>
                <SegmentedControl.Item value='light'>라이트</SegmentedControl.Item>
                <SegmentedControl.Item value='dark'>다크</SegmentedControl.Item>
              </SegmentedControl.Root>
            )}
          </div>
        </GlobalNavigation.List>
        <GlobalNavigation.MobileMenuButton
          className={`z-51 ${textColor}`}
          onClick={handleOpenSidebar}
        />
        <Sidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      </GlobalNavigation.Root>
    </div>
  );
};

export default GlobalNavigationBar;
