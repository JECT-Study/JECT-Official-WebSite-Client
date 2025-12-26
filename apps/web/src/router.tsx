import { Navigate } from "react-router-dom";

import { PATH } from "./constants/path";
import { sentryCreateBrowserRouter } from "./instrument";
import Maintenance from "./pages/Maintenance";
import NonSpecificError from "./pages/NonSpecificError";
import NotFoundError from "./pages/NotFoundError";

import ApplyLayout from "@/components/layout/ApplyLayout";
import Layout from "@/components/layout/Layout";
import Activity from "@/pages/Activity";
import ApplyFunnelPage from "@/pages/ApplyFunnelPage";
import ApplyGuidePage from "@/pages/ApplyGuidePage";
import ContinueWritingFunnelPage from "@/pages/ContinueWritingFunnelPage";
import Faq from "@/pages/Faq";
import Main from "@/pages/Main";
import Project from "@/pages/Project";
import ProjectDetail from "@/pages/ProjectDetail";
import RecruitmentComplete from "@/pages/RecruitmentComplete";
import ResetPinPage from "@/pages/ResetPinPage";

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
      // 레거시 라우트 → /apply로 리다이렉트
      { path: "/apply/verify", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/applicant-info", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/registration", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/complete", element: <Navigate to={PATH.apply} replace /> },
      {
        element: <ApplyLayout />,
        children: [
          { path: `${PATH.applyGuide}/:jobFamily`, element: <ApplyGuidePage /> },
          { path: `${PATH.applyFunnel}/:jobFamily`, element: <ApplyFunnelPage /> },
          { path: `${PATH.applyContinue}/:jobFamily`, element: <ContinueWritingFunnelPage /> },
          { path: PATH.resetPin, element: <ResetPinPage /> },
        ],
      },
    ],
    errorElement: <NonSpecificError />,
  },
  { path: PATH.nonSpecificError, element: <NonSpecificError /> },
  { path: PATH.notFoundError, element: <NotFoundError /> },
  { path: PATH.maintenance, element: <Maintenance /> },
  { path: "*", element: <NotFoundError /> },
]);

export default router;
