import { Outlet } from "react-router-dom";

import PagesContainer from "./PagesContainer";
import ScrollToTop from "./ScrollToTop";

import Dialog from "@/components/common/dialog/Dialog";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/navigation/Header";

function Layout() {
  return (
    <>
      <Header />
      <PagesContainer>
        <ScrollToTop />
        <Outlet />
      </PagesContainer>
      <Dialog />
      <Footer />
    </>
  );
}

export default Layout;
