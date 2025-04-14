import { Outlet } from 'react-router-dom';

import AdminNavigation from './AdminNavigation';

function AdminLayout() {
  return (
    <div className='flex'>
      <AdminNavigation />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
