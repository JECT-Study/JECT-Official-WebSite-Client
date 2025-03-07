import { PATH } from './constants/path';

import Layout from '@/components/layout/Layout';
import Activity from '@/pages/Activity';
import Apply from '@/pages/Apply';
import ApplyApplicantInfo from '@/pages/ApplyApplicationInfo';
import ApplyComplete from '@/pages/ApplyComplete';
import Faq from '@/pages/Faq';
import Main from '@/pages/Main';

const routerList = [
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.project, element: <></> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <Apply /> },
      { path: PATH.faq, element: <Faq /> },
      { path: PATH.applyVerify, element: <></> },
      { path: PATH.applicantInfo, element: <ApplyApplicantInfo /> },
      { path: PATH.applyRegistration, element: <></> },
      { path: PATH.applyComplete, element: <ApplyComplete /> },
    ],
  },
];

export default routerList;
