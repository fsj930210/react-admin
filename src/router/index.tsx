import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

import type { Router } from '@remix-run/router';

const router: Router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PUBLIC_PATH,
});

export default router;
