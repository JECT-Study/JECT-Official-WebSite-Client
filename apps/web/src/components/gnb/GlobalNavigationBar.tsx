import {
  GlobalNavigation,
  LabelButton,
  BlockButton,
  Logo,
  SegmentedControl,
  useGlobalNavigationVariant,
} from "@ject/jds";

import { JectMenu, JoinGuideMenu, ProgramMenu } from "./Menus";

import { useTheme } from "@/hooks/useTheme";

interface GlobalNavigationBarProps {}

const GlobalNavigationBar = ({}: GlobalNavigationBarProps) => {
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const variant = useGlobalNavigationVariant();

  const handleThemeChange = (value: string) => {
    if (value === "light") {
      setLightTheme();
    } else if (value === "dark") {
      setDarkTheme();
    }
  };

  const textColor = variant === "empty" ? "text-white!" : "";
  const blockButtonColor = variant === "empty" ? "bg-[#E7E7F3]! text-[#191B24]!" : "";

  return (
    <div className='fixed inset-0 z-50'>
      <GlobalNavigation.Root variant={variant}>
        <GlobalNavigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} className={`${textColor}`} />
        </GlobalNavigation.LogoItem>
        <GlobalNavigation.Divider />
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
          <div style={{ width: "160px" }}>
            {variant === "solid" && (
              <SegmentedControl.Root value={theme} size='xs' onValueChange={handleThemeChange}>
                <SegmentedControl.Item value='light'>라이트</SegmentedControl.Item>
                <SegmentedControl.Item value='dark'>다크</SegmentedControl.Item>
              </SegmentedControl.Root>
            )}
          </div>
          <GlobalNavigation.Item>
            <BlockButton.Basic
              hierarchy='primary'
              size='sm'
              onClick={() => alert("hello!")}
              className={`${blockButtonColor}`}
            >
              지원하기
            </BlockButton.Basic>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
      </GlobalNavigation.Root>
    </div>
  );
  //TODO: 테마 버튼이 variant에 띠리 나오도록 설정해야함.
  //TODO: 테마 버튼이 제대로 클릭되지 않음.
};

export default GlobalNavigationBar;
