import Layout from './components/common/layout/Layout';

import Apply from '@/pages/Apply';
import Faq from '@/pages/Faq';

const routerList = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <></> },
      { path: '/project', element: <></> },
      { path: '/activity', element: <></> },
      { path: '/apply', element: <Apply /> },
      { path: '/faq', element: <Faq /> },
    ],
  },
];

export default routerList;
