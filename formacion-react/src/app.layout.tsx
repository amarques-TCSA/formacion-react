import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router';

import {
  CabeceraEstandar,
  LayoutResponsive,
  Sidebar,
} from '@tracasa/tracasa-components';
import { Routes } from './shared/config/routing';

export default function AppLayout() {
  const navigate = useNavigate();
  const cabecera = <CabeceraEstandar title="Tracasa" subtitle="Taller React" />;
  const barraLateral = <Sidebar
    goToPage={(page: string) => {
      navigate(page);
    }}
    botones={[{
      texto: 'Inicio',
      icono: 'home',
      page: Routes.inicio.absolutePath,
      position: 0,
      selected: true,
      movil: true,
      anclado: true
    }, {
      texto: 'Formulario',
      icono: 'file',
      page: Routes.formulario.absolutePath,
      position: 1,
      movil: true,
      anclado: true
    }, {
      texto: 'Buscador',
      icono: 'search',
      page: Routes.buscador.absolutePath,
      position: 2,
      movil: true,
      anclado: true
    }]} />;

  return (
    <div className="app-layout__wrapper">
      <LayoutResponsive
        cabecera={cabecera}
        barraLateral={barraLateral}
        contenido={
          <Suspense>
            <Outlet />
          </Suspense>
        }
      />
    </div>
  );
}
