import { Outlet } from "react-router-dom";

import PagesContainer from "./PagesContainer";
import ScrollToTop from "./ScrollToTop";
import GlobalNavigationBar from "../gnb/GlobalNavigationBar";

import Dialog from "@/components/common/dialog/Dialog";
import Footer from "@/components/common/footer/Footer";
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
      <Footer />
    </>
  );
}

export default Layout;
