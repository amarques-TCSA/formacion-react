import { Suspense, lazy } from 'react';
import {
  RouterProvider,
  createHashRouter,
} from 'react-router';

import { Routes } from './shared/config/routing';
import AppLayout from './app.layout';

const Inicio = lazy(
  () => import('./pages/inicio/inicio'),
);

const Buscador = lazy(
  () => import('./pages/buscador/buscador'),
);

const Formulario = lazy(
  () => import('./pages/formulario/formulario'),
);

export default function AppRouter() {

  const router = createHashRouter([
    { path: '*', element: <>No existe esta página</> },
    { path: Routes.inicio.relativePath, element: <Inicio /> },
    {
      path: Routes.root.relativePath,
      element: <AppLayout />,
      children: [
        {
          path: Routes.buscador.relativePath,
          children: [
            {
              path: '',
              element: <Buscador />,
            },
            {
              path: Routes.formulario.relativePath,
              element: <Formulario />,
            },
          ],
        }
      ],
    },
  ]);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}
