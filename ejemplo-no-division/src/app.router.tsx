import { Suspense, lazy } from 'react';
import {
  RouterProvider,
  createHashRouter,
} from 'react-router';

import { Routes } from './shared/config/routing';
import AppLayout from './app.layout';
import HookVsFuncion from './pages/hook-vs-funcion/hook-vs-funcion';

const Formulario = lazy(
  () => import('./pages/formulario/formulario'),
);
const Renderizados = lazy(
  () => import('./pages/renderizados/renderizados'),
);
const QueryVsSuspense = lazy(
  () => import('./pages/query-vs-suspense/query-vs-suspense'),
);

export default function AppRouter() {

  const router = createHashRouter([
    { path: '*', element: <>No existe esta página</> },
    {
      path: Routes.root.relativePath,
      element: <AppLayout />,
      children: [
        {
          path: Routes.formulario.relativePath,
          element: <Formulario />,
        },
        {
          path: Routes.renderizados.relativePath,
          element: <Renderizados />,
        },
        {
          path: Routes.queryVsSuspense.relativePath,
          element: <QueryVsSuspense />,
        },
        {
          path: Routes.hookVsFuncion.relativePath,
          element: <HookVsFuncion />,
        },
      ],
    },
  ]);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}
