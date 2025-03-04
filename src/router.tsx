import { PATH } from './constants/path';

import Layout from '@/components/layout/Layout';
import Apply from '@/pages/Apply';
import Faq from '@/pages/Faq';
import Main from '@/pages/Main';

const routerList = [
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.project, element: <></> },
      { path: PATH.activity, element: <></> },
      { path: PATH.apply, element: <Apply /> },
      { path: PATH.faq, element: <Faq /> },
    ],
  },
];

export default routerList;
