import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  routes,
  {
    basename: import.meta.env.VITE_PUBLIC_PATH,
  },
);

export default router;
