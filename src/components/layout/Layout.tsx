import { Outlet } from 'react-router-dom';

import PagesContainer from './PagesContainer';

import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/navigation/Header';

function Layout() {
  return (
    <>
      <Header />
      <PagesContainer>
        <Outlet />
      </PagesContainer>
      <Footer />
    </>
  );
}

export default Layout;
