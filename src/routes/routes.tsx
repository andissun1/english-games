import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { Games } from '../pages/Games/Games';
import { Bricks } from '../pages/Bricks/Bricks';
import { NaturalDisasters } from '../pages/NaturalDisasters/NaturalDisasters';

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
      path: 'NaturalDisasters',
      Component: NaturalDisasters,
    },
    {
      path: '*',
      element: <Navigate to={'/'} />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
