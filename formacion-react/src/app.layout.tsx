import { Suspense } from 'react';
import { Outlet } from 'react-router';

import {
  Cabecera,
  GlobalLayout,
} from '@tracasa/tracasa-components';

export default function AppLayout() {
  return (
    <div className="app-layout__wrapper">
      <GlobalLayout>
        <Cabecera children={undefined}

        />
        <Suspense>
          <Outlet />
        </Suspense>
      </GlobalLayout>
    </div>
  );
}
