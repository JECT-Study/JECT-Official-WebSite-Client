import RedirectIfSubmitted from './components/apply/RedirectIfSubmitted';
import { PATH } from './constants/path';
import { sentryCreateBrowserRouter } from './instrument';
import NonSpecificError from './pages/NonSpecificError';
import NotFoundError from './pages/NotFoundError';

import Layout from '@/components/layout/Layout';
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
import RenderErrorFallback from '@/pages/RenderErrorFallback';

const router = sentryCreateBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.project, element: <Project /> },
      { path: `${PATH.project}/:id`, element: <ProjectDetail /> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <Apply /> },
      { path: PATH.faq, element: <Faq /> },
      { path: PATH.applyVerify, element: <ApplyVerify /> },
      {
        path: PATH.applicantInfo,
        element: (
          <RedirectIfSubmitted>
            <ApplyApplicantInfo />
          </RedirectIfSubmitted>
        ),
      },
      {
        path: PATH.applyRegistration,
        element: (
          <RedirectIfSubmitted>
            <ApplyRegistration />
          </RedirectIfSubmitted>
        ),
      },
      { path: PATH.applyComplete, element: <ApplyComplete /> },
      { path: '*', element: <NotFoundError /> },
    ],
    errorElement: <RenderErrorFallback />,
  },
  { path: PATH.nonSpecificError, element: <NonSpecificError /> },
  { path: PATH.notFoundError, element: <NotFoundError /> },
]);

export default router;
