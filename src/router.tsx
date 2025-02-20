import Apply from '@/pages/Apply';
import ApplyComplete from '@/pages/ApplyComplete';
import ApplyInfo from '@/pages/ApplyInfo';
import ApplyRegistration from '@/pages/ApplyRegistration';
import ApplyVerify from '@/pages/ApplyVerify';

const routerList = [
  {
    path: '/apply',
    element: <Apply />,
  },
  {
    path: '/apply/info',
    element: <ApplyInfo />,
  },
  {
    path: '/apply/verify',
    element: <ApplyVerify />,
  },
  {
    path: '/apply/registration',
    element: <ApplyRegistration />,
  },
  {
    path: '/apply/complete',
    element: <ApplyComplete />,
  },
];

export default routerList;
