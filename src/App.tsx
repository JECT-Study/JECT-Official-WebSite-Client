import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routerList from './router';

const router = createBrowserRouter(routerList);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
