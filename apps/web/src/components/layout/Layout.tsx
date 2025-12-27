import { Outlet } from "react-router-dom";

import PagesContainer from "./PagesContainer";
import ScrollToTop from "./ScrollToTop";
import Footer from "../common/footer/Footer";
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
      <Footer />
    </>
  );
}

export default Layout;
