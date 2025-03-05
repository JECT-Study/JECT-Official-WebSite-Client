import { PATH } from './constants/path';

import Layout from '@/components/layout/Layout';
import Activity from '@/pages/Activity';
import Apply from '@/pages/Apply';
import Faq from '@/pages/Faq';

const routerList = [
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <></> },
      { path: PATH.project, element: <></> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <Apply /> },
      { path: PATH.faq, element: <Faq /> },
    ],
  },
];

export default routerList;
