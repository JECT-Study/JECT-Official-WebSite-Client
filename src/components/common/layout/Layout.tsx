import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import PageContainer from './PageContainer';

function Layout() {
  return (
    <>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </>
  );
}

export default Layout;
