import { Outlet } from "react-router-dom";

import PageBoard from "./PageBoard";

function StandardLayout() {
  return (
    <PageBoard>
      <Outlet />
    </PageBoard>
  );
}

export default StandardLayout;
