import { AdminLayout, ClientLayout } from './components/layout/Layout';
import { PATH } from './constants/path';
import { sentryCreateBrowserRouter } from './instrument';
import Maintenance from './pages/Maintenance';
import NonSpecificError from './pages/NonSpecificError';
import NotFoundError from './pages/NotFoundError';

import Activity from '@/pages/Activity';
import Apply from '@/pages/Apply';
import ApplyApplicantInfo from '@/pages/ApplyApplicationInfo';
import ApplyComplete from '@/pages/ApplyComplete';
import ApplyRegistration from '@/pages/ApplyRegistration';
import ApplyVerify from '@/pages/ApplyVerify';
import Faq from '@/pages/Faq';
import Main from '@/pages/Main';
import Project from '@/pages/Project';
import ProjectDetail from '@/pages/ProjectDetail';

const router = sentryCreateBrowserRouter([
  {
    element: <ClientLayout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.project, element: <Project /> },
      { path: `${PATH.project}/:id`, element: <ProjectDetail /> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <Apply /> },
      { path: `${PATH.faq}/:tabId?/:questionId?`, element: <Faq /> },
      { path: PATH.applyVerify, element: <ApplyVerify /> },
      { path: PATH.applicantInfo, element: <ApplyApplicantInfo /> },
      { path: PATH.applyRegistration, element: <ApplyRegistration /> },
      { path: PATH.applyComplete, element: <ApplyComplete /> },
    ],
    errorElement: <NonSpecificError />,
  },
  { path: PATH.nonSpecificError, element: <NonSpecificError /> },
  { path: PATH.notFoundError, element: <NotFoundError /> },
  { path: PATH.maintenance, element: <Maintenance /> },
  { path: '*', element: <NotFoundError /> },
  {
    element: <AdminLayout />,
    children: [],
  },
]);

export default router;
