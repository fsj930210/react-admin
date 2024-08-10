import { createBrowserRouter } from 'react-router-dom';

// import routes from './routes';
import routes from 'virtual:vite-plugin-react-file-router';

console.log(routes);
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PUBLIC_PATH,
});

export default router;
