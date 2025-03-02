import { Outlet } from 'react-router-dom';

import PagesContainer from './PagesContainer';

import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/navigation/Header';
import Toast from '@/components/common/toast/Toast';

function Layout() {
  return (
    <>
      <Header />
      <PagesContainer>
        <Outlet />
      </PagesContainer>
      <Toast />
      <Footer />
    </>
  );
}

export default Layout;
