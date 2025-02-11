import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routerList from './utils/router';

const router = createBrowserRouter(routerList);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
