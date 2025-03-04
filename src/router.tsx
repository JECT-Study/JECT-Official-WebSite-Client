import { PATH } from './constants/path';

import Layout from '@/components/layout/Layout';
import Apply from '@/pages/Apply';
import ApplyComplete from '@/pages/ApplyComplete';
import ApplyInfo from '@/pages/ApplyInfo';
import ApplyRegistration from '@/pages/ApplyRegistration';
import ApplyVerify from '@/pages/ApplyVerify';
import Faq from '@/pages/Faq';

const routerList = [
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <></> },
      { path: PATH.project, element: <></> },
      { path: PATH.activity, element: <></> },
      { path: PATH.apply, element: <Apply /> },
      { path: PATH.faq, element: <Faq /> },
      { path: PATH.applyInfo, element: <ApplyInfo /> },
      { path: PATH.applyVerify, element: <ApplyVerify /> },
      { path: PATH.applyRegistration, element: <ApplyRegistration /> },
      { path: PATH.applyComplete, element: <ApplyComplete /> },
    ],
  },
];

export default routerList;
