import { Footer, Logo } from "@ject/jds";
import { Outlet } from "react-router-dom";

import PagesContainer from "./PagesContainer";
import ScrollToTop from "./ScrollToTop";
import GlobalNavigationBar from "../gnb/GlobalNavigationBar";

import Dialog from "@/components/common/dialog/Dialog";
import Toast from "@/components/common/toast/Toast";

function Layout() {
  return (
    <>
      <GlobalNavigationBar />
      <PagesContainer>
        <ScrollToTop />
        <Outlet />
      </PagesContainer>
      <Toast />
      <Dialog />
      <Footer.Root>
        <Footer.Content>
          <Footer.Header>
            <Footer.LogoDiv>
              <Logo href="/" height={16} hierarchy="inverse" />
            </Footer.LogoDiv>
            <Footer.Social
              github="https://github.com/JECT-Study"
              instagram="https://www.instagram.com/ject_official"
            />
          </Footer.Header>
          <Footer.Divider />
          <Footer.Bottom
            copyright="© 2025 JECT. All rights reserved."
            email="jectofficial@ject.kr"
            privacyLink="https://cultured-phalange-7de.notion.site/2cd62a893ac580129760c2b304eacec5"
          />
        </Footer.Content>
      </Footer.Root>
    </>
  );
}

export default Layout;
