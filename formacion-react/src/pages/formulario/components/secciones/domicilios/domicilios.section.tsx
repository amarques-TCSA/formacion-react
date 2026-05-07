import { createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  createColumnDefs,
  ElementoListadoProps,
  ListadoPaginado,
  Mensaje,
  normalizeString,
  RowLayout,
  Section,
  TiposOrden,
} from '@tracasa/tracasa-components';
import { t } from 'i18next';
import { useState } from 'react';

import ModalDomicilio from '../../modal/modal-domicilio';
import { useModalDomicilioStore } from '../../modal/modal-domicilio.store';
import { IFormularioRepository } from '@/shared/repositories/formulario';
import {
  defaultFormularioValues,
  DomicilioForm,
  DomicilioItem,
  DomicilioListado,
} from './domicilios.model';

const domiciliosIniciales: DomicilioItem[] = [
  {
    id: 1,
    calle: 'Garajonay',
    numero: '11',
    codigoPostal: '31621',
    ciudad: 'sarriguren',
    provincia: 'navarra',
    tipoResidencia: 'propia',
    fechaInicio: '22/03/2020',
    actual: '✓',
  },
  {
    id: 2,
    calle: 'C. Bardenas Reales',
    numero: '52-54',
    codigoPostal: '31621',
    ciudad: 'sarriguren',
    provincia: 'navarra',
    tipoResidencia: 'alquiler',
    fechaInicio: '25/11/2003',
    actual: '✕',
  },
];

const tipoResidenciaLabels: Record<string, string> = {
  propia: 'Propia',
  alquiler: 'Alquiler',
  cedida: 'Cedida',
};

const columnasDomicilios = createColumnDefs(
  createColumnHelper<ElementoListadoProps<DomicilioListado>>(),
  [
    {
      id: 'direccion',
      texto: 'Direccion',
      tipo: 'texto',
      tamano: 33,
      alinear: 'izquierda',
    },
    {
      id: 'tipoResidencia',
      texto: 'Tipo de residencia',
      tipo: 'texto',
      tamano: 20,
      alinear: 'izquierda',
    },
    {
      id: 'fechaInicio',
      texto: 'Fecha de inicio',
      tipo: 'texto',
      tamano: 20,
      alinear: 'izquierda',
    },
    {
      id: 'actual',
      texto: 'Actual',
      tipo: 'texto',
      tamano: 20,
      alinear: 'centro',
    },
  ],
);

export default function DomicilioSection({ formularioRepository }: { formularioRepository: IFormularioRepository }) {
  const abrirModal = useModalDomicilioStore((state) => state.abrirModal);
  const [domicilios, setDomicilios] = useState(domiciliosIniciales);
  const domicilio = useModalDomicilioStore((state) => state.domicilio);

  const handleEliminarDomicilio = (id: number) => {
    setDomicilios((prev) => prev.filter((domicilio) => domicilio.id !== id));
  };

  const handleEditarDomicilio = (id: number) => {
    const domicilio = domicilios.find((item) => item.id === id);
    if (!domicilio) {
      return;
    }
    abrirModal({
      ...domicilio
    });
  };

  const handleGuardarDomicilio = (datos: DomicilioForm, idEdicion?: number) => {
    if (idEdicion) {
      setDomicilios((prev) =>
        prev.map((domicilio) =>
          domicilio.id === idEdicion
            ? {
              ...domicilio,
              ...datos,
            }
            : domicilio,
        ),
      );
      return;
    }

    const siguienteId =
      domicilios.length > 0
        ? Math.max(...domicilios.map((domicilio) => domicilio.id)) + 1
        : 1;

    const nuevoDomicilio: DomicilioItem = {
      id: siguienteId,
      ...datos,
      fechaInicio: new Date().toLocaleDateString('es-ES'),
      actual: '✕',
    };

    setDomicilios((prev) => [...prev, nuevoDomicilio]);
  };

  const domiciliosListado: ElementoListadoProps<DomicilioListado>[] = domicilios.map((domicilio) => ({
    id: domicilio.id,
    direccion: `${domicilio.calle}, ${domicilio.numero}, ${domicilio.codigoPostal} ${normalizeString(
      domicilio.ciudad,
    )}, ${normalizeString(domicilio.provincia)}`,
    tipoResidencia: tipoResidenciaLabels[domicilio.tipoResidencia] ?? domicilio.tipoResidencia,
    fechaInicio: domicilio.fechaInicio,
    actual: domicilio.actual,
    acciones: [
      {
        textoDescriptivo: t('palabras.editar'),
        accion: () => handleEditarDomicilio(domicilio.id),
      },
      {
        textoDescriptivo: t('palabras.eliminar'),
        accion: () => handleEliminarDomicilio(domicilio.id),
      },
    ],
  }));

  return (
    <>
      <Section title={t('formulario.domicilio')} id="domicilio">
        <Mensaje message={t('formulario.mensajeDomicilio')} variant="info" />

        <ListadoPaginado
          datos={domiciliosListado}
          columnas={columnasDomicilios}
          indice={0}
          tamanoPagina={5}
          ordenarPor="fechaInicio"
          tipoOrden={TiposOrden.Ascendente}
          mostrarPaginacion={false}
        />

        <RowLayout justifyContent='end'>
          <Button variant="principal" onClick={() => abrirModal({ ...defaultFormularioValues, id: 0 })}>
            {t('palabras.anadir')}
          </Button>
        </RowLayout>
      </Section>

      {
        domicilio && <ModalDomicilio onGuardar={handleGuardarDomicilio} formularioRepository={formularioRepository} />
      }
    </>
  );
}
