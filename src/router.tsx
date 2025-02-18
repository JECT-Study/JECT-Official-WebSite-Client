import ApplyComplete from './pages/ApplyComplete';
import ApplyFirstStep from './pages/ApplyFirstStep';
import ApplySecondStep from './pages/ApplySecondStep';
import ApplyThirdStep from './pages/ApplyThirdStep';

import Apply from '@/pages/Apply';

const routerList = [
  {
    path: '/apply',
    element: <Apply />,
  },
  {
    path: '/apply/step1',
    element: <ApplyFirstStep />,
  },
  {
    path: '/apply/step2',
    element: <ApplySecondStep />,
  },
  {
    path: '/apply/step3',
    element: <ApplyThirdStep />,
  },
  {
    path: '/apply/complete',
    element: <ApplyComplete />,
  },
];

export default routerList;
