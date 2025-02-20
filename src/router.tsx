import Apply from '@/pages/Apply';
import ApplyAccount from '@/pages/ApplyAccount';
import ApplyComplete from '@/pages/ApplyComplete';
import ApplyRegistration from '@/pages/ApplyRegistration';
import ApplyVerifyEmail from '@/pages/ApplyVerifyEmail';

const routerList = [
  {
    path: '/apply',
    element: <Apply />,
  },
  {
    path: '/apply/account',
    element: <ApplyAccount />,
  },
  {
    path: '/apply/verify-email',
    element: <ApplyVerifyEmail />,
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
