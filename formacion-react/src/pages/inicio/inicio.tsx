import {
  EmptyState,
  Enlace,
  StackLayout,
  TarjetaEnlace,
} from '@tracasa/tracasa-components';

import { Routes } from '@/shared/config/routing';

export default function Inicio() {
  return (
    <StackLayout>
      <EmptyState
        titulo="Proyecto iniciado correctamente"
        background
      >
      </EmptyState>

      <Enlace to={Routes.buscador.absolutePath}>
        <TarjetaEnlace
          id={1}
          titulo="Buscador"
          descripcion="useQuery, zustand, validaciones, listado, inputs"
          ruta={Routes.buscador.absolutePath}
        />
      </Enlace>
      <Enlace to={Routes.formulario.absolutePath}>
        <TarjetaEnlace
          id={2}
          titulo="Formulario"
          descripcion="useForm, validaciones, zustand, modales, inputs"
          ruta={Routes.formulario.absolutePath}
        />
      </Enlace>
    </StackLayout>
  );
}
