import Navigation from "@/components/common/navigation/Navigation";
import NavigationItem from "@/components/common/navigation/NavigationItem";
import { PATH } from "@/constants/path";

function Header() {
  return (
    <Navigation>
      <NavigationItem pathName={PATH.project}>프로젝트</NavigationItem>
      <NavigationItem pathName={PATH.activity}>활동</NavigationItem>
      <NavigationItem pathName={PATH.apply}>지원하기</NavigationItem>
      <NavigationItem pathName={PATH.faq}>자주 묻는 질문</NavigationItem>
    </Navigation>
  );
}

export default Header;
