import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../pages/layouts/Layout';
import { Games } from '../pages/Games/Games';
import { Bricks } from '../pages/Bricks/Bricks';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: Games,
        },
      ],
    },
    {
      path: 'bricks',
      Component: Bricks,
    },
    {
      path: '*',
      element: <Navigate to={'/'} />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
