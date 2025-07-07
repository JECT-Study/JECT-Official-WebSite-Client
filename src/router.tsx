import { PATH } from './constants/path';
import { sentryCreateBrowserRouter } from './instrument';
import CheckSubmit from './pages/CheckSubmit';
import Maintenance from './pages/Maintenance';
import NonSpecificError from './pages/NonSpecificError';
import NotFoundError from './pages/NotFoundError';

import Layout from '@/components/layout/Layout';
import Activity from '@/pages/Activity';
import ApplyApplicantInfo from '@/pages/ApplyApplicationInfo';
import ApplyComplete from '@/pages/ApplyComplete';
import ApplyRegistration from '@/pages/ApplyRegistration';
import ApplyVerify from '@/pages/ApplyVerify';
import Faq from '@/pages/Faq';
import Main from '@/pages/Main';
import Project from '@/pages/Project';
import ProjectDetail from '@/pages/ProjectDetail';
import RecruitmentComplete from '@/pages/RecruitmentComplete';

const router = sentryCreateBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.project, element: <Project /> },
      { path: `${PATH.project}/:id`, element: <ProjectDetail /> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <RecruitmentComplete /> },
      { path: `${PATH.faq}/:tabId?/:questionId?`, element: <Faq /> },
      { path: PATH.applyVerify, element: <ApplyVerify /> },
      {
        element: <CheckSubmit />,
        children: [
          { path: PATH.applicantInfo, element: <ApplyApplicantInfo /> },
          { path: PATH.applyRegistration, element: <ApplyRegistration /> },
        ],
      },
      { path: PATH.applyComplete, element: <ApplyComplete /> },
    ],
    errorElement: <NonSpecificError />,
  },
  { path: PATH.nonSpecificError, element: <NonSpecificError /> },
  { path: PATH.notFoundError, element: <NotFoundError /> },
  { path: PATH.maintenance, element: <Maintenance /> },
  { path: '*', element: <NotFoundError /> },
]);

export default router;
