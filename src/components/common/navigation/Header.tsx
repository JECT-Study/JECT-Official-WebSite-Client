import Navigation from '@/components/common/navigation/Navigation';
import NavigationItem from '@/components/common/navigation/NavigationItem';

function Header() {
  return (
    <Navigation>
      <NavigationItem pathName='/project'>프로젝트</NavigationItem>
      <NavigationItem pathName='/activity'>활동</NavigationItem>
      <NavigationItem pathName='/apply'>지원하기</NavigationItem>
      <NavigationItem pathName='/faq'>자주 묻는 질문</NavigationItem>
    </Navigation>
  );
}

export default Header;
