import AdminNavigationItem from './AdminNavigationItem';

import Logo from '@/components/common/logo/Logo';

function AdminNavigation() {
  return (
    <header className='bg-surface-embossed-dark gap-4xl flex h-dvh w-[13.75rem] flex-col px-(--gap-xl) py-(--gap-4xl)'>
      <button>
        <Logo height={19.87} fillColor='fill-object-hero-dark' />
      </button>
      <nav className='gap-sm flex flex-col'>
        <AdminNavigationItem to='/admin/temp' disabled>
          프로젝트 관리
        </AdminNavigationItem>
        <AdminNavigationItem to='/admin/temp' disabled>
          프로젝트 상세 관리
        </AdminNavigationItem>
        <AdminNavigationItem to='/admin/temp' disabled>
          활동 관리
        </AdminNavigationItem>
        <AdminNavigationItem to='/admin/temp' disabled>
          미니 스터디 관리
        </AdminNavigationItem>
        <AdminNavigationItem to='/admin/temp' disabled>
          젝톡 관리
        </AdminNavigationItem>
        <AdminNavigationItem to='/admin/apply'>지원서 관리</AdminNavigationItem>
        <AdminNavigationItem to='/admin/temp' disabled>
          자주 묻는 질문 관리
        </AdminNavigationItem>
      </nav>
    </header>
  );
}

export default AdminNavigation;
