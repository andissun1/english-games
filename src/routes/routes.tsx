import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../pages/layouts/Layout';
import { Main } from '../pages/main/Main';
import { Games } from '../pages/Games/Games';
import { Bricks } from '../pages/Bricks/Bricks';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: 'games',
        Component: Games,
      },
    ],
  },
  {
    path: 'bricks',
    Component: Bricks,
  },
]);
