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
import { Control, useFieldArray } from 'react-hook-form';

import ModalDomicilio from '../../modal/modal-domicilio';
import { useModalDomicilioStore } from '../../modal/modal-domicilio.store';
import { IFormularioRepository } from '@/shared/repositories/formulario';
import { FormularioSeccionesForm } from '../../../models/formulario.model';
import {
  defaultFormularioValues,
  DomicilioForm,
  DomicilioId,
  DomicilioListado,
} from './domicilios.model';

const tipoResidenciaLabels: Record<string, string> = {
  propia: 'Propia',
  alquiler: 'Alquiler',
  cedida: 'Cedida',
};

const columnas = createColumnDefs(
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

type DomicilioSectionProps = {
  control: Control<FormularioSeccionesForm>;
  formularioRepository: IFormularioRepository;
};

export default function DomicilioSection({ control, formularioRepository }: DomicilioSectionProps) {
  const abrirModal = useModalDomicilioStore((state) => state.abrirModal);
  const domicilio = useModalDomicilioStore((state) => state.domicilio);

  const { fields: domicilios, append, update, remove } = useFieldArray({
    control,
    name: 'domicilios',
    keyName: 'fieldId',
  });

  const handleEliminarDomicilio = (id: number) => {
    const index = domicilios.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }
    remove(index);
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
      const index = domicilios.findIndex((item) => item.id === idEdicion);
      if (index < 0) {
        return;
      }

      update(index, {
        ...domicilios[index],
        ...datos,
      });
      return;
    }

    const siguienteId =
      domicilios.length > 0
        ? Math.max(...domicilios.map((domicilio) => domicilio.id)) + 1
        : 1;

    const nuevoDomicilio: DomicilioId = {
      id: siguienteId,
      ...datos,
      fechaInicio: new Date().toLocaleDateString('es-ES'),
      actual: false,
    };

    append(nuevoDomicilio);
  };

  const domiciliosListado: ElementoListadoProps<DomicilioListado>[] = domicilios.map((domicilio) => ({
    id: domicilio.id,
    direccion: `${domicilio.calle}, ${domicilio.numero}, ${domicilio.codigoPostal} ${normalizeString(
      domicilio.ciudad,
    )}, ${normalizeString(domicilio.provincia)}`,
    tipoResidencia: tipoResidenciaLabels[domicilio.tipoResidencia] ?? domicilio.tipoResidencia,
    fechaInicio: domicilio.fechaInicio,
    actual: domicilio.actual ? t('palabras.si') : t('palabras.no'),
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
          columnas={columnas}
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
        domicilio &&
          <ModalDomicilio
            onGuardar={handleGuardarDomicilio}
            formularioRepository={formularioRepository}
          />
      }
    </>
  );
}
