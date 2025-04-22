import { Outlet } from 'react-router-dom';

import PagesContainer from './PagesContainer';
import ScrollToTop from './ScrollToTop';

import AdminNavigation from '@/components/admin/layout/AdminNavigation';
import Dialog from '@/components/common/dialog/Dialog';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/navigation/Header';
import Toast from '@/components/common/toast/Toast';

export function ClientLayout() {
  return (
    <>
      <Header />
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

export function AdminLayout() {
  return (
    <div className='flex'>
      <AdminNavigation />
      <Outlet />
    </div>
  );
}
