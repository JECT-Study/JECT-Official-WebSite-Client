import { Navigate } from "react-router-dom";

import { PATH } from "./constants/path";
import { sentryCreateBrowserRouter } from "./instrument";
import Maintenance from "./pages/Maintenance";
import NonSpecificError from "./pages/NonSpecificError";
import NotFoundError from "./pages/NotFoundError";
import TeamProject from "./pages/TeamProject";
import TeamProjectDetail from "./pages/TeamProjectDetail";

import ApplyLayout from "@/components/layout/ApplyLayout";
import Layout from "@/components/layout/Layout";
import Activity from "@/pages/Activity";
import ApplyFunnelPage from "@/pages/ApplyFunnelPage";
import ApplyGuidePage from "@/pages/ApplyGuidePage";
import ApplyListPage from "@/pages/ApplyListPage";
import ContinueWritingFunnelPage from "@/pages/ContinueWritingFunnelPage";
import Faq from "@/pages/Faq";
import Main from "@/pages/Main";
import RecruitmentComplete from "@/pages/RecruitmentComplete";
import ResetPinPage from "@/pages/ResetPinPage";
import Vision from "@/pages/Vision";

const router = sentryCreateBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: PATH.main, element: <Main /> },
      { path: PATH.vision, element: <Vision /> },
      { path: `${PATH.project}/:id`, element: <TeamProjectDetail /> },
      { path: PATH.activity, element: <Activity /> },
      { path: PATH.apply, element: <RecruitmentComplete /> },
      { path: `${PATH.faq}/:tabId?/:questionId?`, element: <Faq /> },
      { path: PATH.teamProject, element: <TeamProject /> },
      // 레거시 라우트 → /apply로 리다이렉트
      { path: "/apply/verify", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/applicant-info", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/registration", element: <Navigate to={PATH.apply} replace /> },
      { path: "/apply/complete", element: <Navigate to={PATH.apply} replace /> },
      {
        element: <ApplyLayout />,
        children: [
          { path: PATH.applyList, element: <ApplyListPage /> },
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
