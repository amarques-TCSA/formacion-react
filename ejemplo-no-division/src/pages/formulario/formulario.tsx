import { yupResolver } from '@hookform/resolvers/yup';
import { createColumnHelper } from '@tanstack/react-table';
import {
  BarraHerramientas,
  BarraLateral,
  Button,
  createColumnDefs,
  ElementoListadoProps,
  Form,
  FormField,
  FormGrid,
  IndiceLateral,
  Input,
  InputDate,
  InputDateTime,
  ListadoPaginado,
  Main,
  Mensaje,
  Modal,
  normalizeString,
  RowLayout,
  Section,
  SectionGroup,
  Selector,
  TextButton,
  TiposOrden,
} from '@tracasa/tracasa-components';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { useFormHook } from '@/shared/hooks/use-form-hook';
import {
  FormularioHttpRepository,
} from '@/shared/repositories/formulario';

import { EnviarFormulario, ObtenerFormularioMaestros } from './formulario.service';
import {
  defaultDomicilioValues,
  defaultFormularioValues,
  DomicilioForm,
  DomicilioId,
  DomicilioListado,
  domiciliosSchema,
  formularioSeccionesSchema,
  FormularioSeccionesForm,
} from './models/formulario';

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

type ModalDomicilioState = {
  abierto: boolean;
  domicilio: DomicilioId | null;
};

export default function Formulario() {
  const formularioRepository = FormularioHttpRepository();

  const registro = useForm<FormularioSeccionesForm>({
    mode: 'onSubmit',
    resolver: yupResolver(formularioSeccionesSchema),
    defaultValues: async (): Promise<FormularioSeccionesForm> => {
      const domicilios = await formularioRepository.obtenerDomicilios();

      return {
        ...defaultFormularioValues,
        domicilios,
      };
    },
  });

  const { mutate: guardar } = EnviarFormulario({ formularioRepository });

  const {
    control,
    reset,
    formState: { errors },
  } = registro;

  const onSubmit = (data: FormularioSeccionesForm) => {
    const { domicilios, ...formulario } = data;
    console.log('Datos del formulario:', formulario);
    console.log('Domicilios:', domicilios);
    guardar(data);
  };

  const { handleKeyPress } = useFormHook({
    registro,
    onSubmit,
  });

  const { nacionalidades, estadosCiviles, ciudades, provincias, tiposResidencia } =
    ObtenerFormularioMaestros({ formularioRepository });

  const { fields: domicilios, append, update, remove } = useFieldArray({
    control,
    name: 'domicilios',
    keyName: 'fieldId',
  });

  const [modalDomicilio, setModalDomicilio] = useState<ModalDomicilioState>({
    abierto: false,
    domicilio: null,
  });

  const modalRegistro = useForm<DomicilioForm>({
    defaultValues: defaultDomicilioValues,
    resolver: yupResolver(domiciliosSchema),
  });

  const {
    control: modalControl,
    handleSubmit: handleModalSubmit,
    reset: resetModal,
    formState: { errors: modalErrors },
  } = modalRegistro;

  useEffect(() => {
    if (modalDomicilio.abierto && modalDomicilio.domicilio) {
      const { ...datos } = modalDomicilio.domicilio;
      resetModal(datos);
      return;
    }

    if (modalDomicilio.abierto) {
      resetModal(defaultDomicilioValues);
    }
  }, [modalDomicilio, resetModal]);

  const abrirModal = (domicilio?: DomicilioId) => {
    setModalDomicilio({
      abierto: true,
      domicilio: domicilio ?? null,
    });
  };

  const cerrarModal = () => {
    resetModal(defaultDomicilioValues);
    setModalDomicilio({ abierto: false, domicilio: null });
  };

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
    abrirModal(domicilio as DomicilioId);
  };

  const handleGuardarDomicilio = (datos: DomicilioForm) => {
    const idEdicion = modalDomicilio.domicilio?.id;

    if (typeof idEdicion === 'number') {
      const index = domicilios.findIndex((item) => item.id === idEdicion);
      if (index < 0) {
        return;
      }

      update(index, {
        ...domicilios[index],
        ...datos,
      });
      cerrarModal();
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
    cerrarModal();
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

  const tiposDocumento = [
    { id: 'dni', texto: t('formulario.opcionDocumentoDni') },
    { id: 'pasaporte', texto: t('formulario.opcionDocumentoPasaporte') },
    { id: 'nie', texto: t('formulario.opcionDocumentoNie') },
  ];

  return (
    <Form
      registro={registro}
      onReset={reset}
      onSubmit={onSubmit}
      data-testid="buscador-expedientes-fiscalia-form"
      onKeyDown={handleKeyPress}
    >
      <BarraHerramientas>
        <Button onClick={() => { }}>{t('palabras.cancelar')}</Button>
        <Button type="submit" variant="principal" conOpciones>
          {t('palabras.guardar')}
        </Button>
      </BarraHerramientas>

      <Main>
        <SectionGroup>
          <Section title={t('formulario.datosPersonales')} id="datosPersonales">
            <FormGrid>
              <FormField id="nombre" labelText={t('formulario.nombre')} error={errors.nombre}>
                <Controller
                  name="nombre"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nombre"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.nombre}
                    />
                  )}
                />
              </FormField>

              <FormField
                id="primerApellido"
                labelText={t('formulario.primerApellido')}
                error={errors.primerApellido}
              >
                <Controller
                  name="primerApellido"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="primerApellido"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.primerApellido}
                    />
                  )}
                />
              </FormField>

              <FormField
                id="segundoApellido"
                labelText={t('formulario.segundoApellido')}
                error={errors.segundoApellido}
              >
                <Controller
                  name="segundoApellido"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="segundoApellido"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.segundoApellido}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.fechaRegistro')}
                error={errors.fechaRegistro}
                id="fechaRegistro"
              >
                <Controller
                  name="fechaRegistro"
                  control={control}
                  render={({ field }) => (
                    <InputDateTime
                      id="fechaRegistro"
                      error={!!errors.fechaRegistro}
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.fechaNacimiento')}
                error={errors.fechaNacimiento}
                id="fechaNacimiento"
              >
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <InputDate
                      id="fechaNacimiento"
                      error={!!errors.fechaNacimiento}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormField>

              <FormField
                id="lugarNacimiento"
                labelText={t('formulario.lugarNacimiento')}
                error={errors.lugarNacimiento}
              >
                <Controller
                  name="lugarNacimiento"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="lugarNacimiento"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.lugarNacimiento}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.nacionalidad')}
                id="nacionalidad"
                error={errors.nacionalidad}
              >
                <Controller
                  control={control}
                  name="nacionalidad"
                  render={({ field }) => (
                    <Selector
                      permitirBusqueda
                      mostrarX
                      id="nacionalidad"
                      opciones={nacionalidades}
                      idSeleccionado={field.value?.toString() ?? null}
                      onChange={field.onChange}
                      error={!!errors.nacionalidad}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.estadoCivil')}
                id="estadoCivil"
                error={errors.estadoCivil}
              >
                <Controller
                  control={control}
                  name="estadoCivil"
                  render={({ field }) => (
                    <Selector
                      permitirBusqueda
                      mostrarX
                      id="estadoCivil"
                      opciones={estadosCiviles}
                      idSeleccionado={field.value?.toString() ?? null}
                      onChange={field.onChange}
                      error={!!errors.estadoCivil}
                    />
                  )}
                />
              </FormField>
            </FormGrid>
          </Section>

          <Section title={t('formulario.documentoIdentidad')} id="documentoIdentidad">
            <FormGrid>
              <FormField
                id="tipoDocumento"
                labelText={t('formulario.tipoDocumento')}
                error={errors.tipoDocumento}
              >
                <Controller
                  name="tipoDocumento"
                  control={control}
                  render={({ field }) => (
                    <Selector
                      permitirBusqueda
                      mostrarX
                      id="tipoDocumento"
                      opciones={tiposDocumento}
                      idSeleccionado={field.value?.toString() ?? null}
                      onChange={field.onChange}
                      error={!!errors.tipoDocumento}
                    />
                  )}
                />
              </FormField>

              <FormField
                id="numeroDocumento"
                labelText={t('formulario.numeroDocumento')}
                error={errors.numeroDocumento}
              >
                <Controller
                  name="numeroDocumento"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="numeroDocumento"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.numeroDocumento}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.fechaExpedicionDocumento')}
                error={errors.fechaExpedicionDocumento}
                id="fechaExpedicionDocumento"
              >
                <Controller
                  name="fechaExpedicionDocumento"
                  control={control}
                  render={({ field }) => (
                    <InputDate
                      id="fechaExpedicionDocumento"
                      error={!!errors.fechaExpedicionDocumento}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormField>

              <FormField
                labelText={t('formulario.fechaCaducidadDocumento')}
                error={errors.fechaCaducidadDocumento}
                id="fechaCaducidadDocumento"
              >
                <Controller
                  name="fechaCaducidadDocumento"
                  control={control}
                  render={({ field }) => (
                    <InputDate
                      id="fechaCaducidadDocumento"
                      error={!!errors.fechaCaducidadDocumento}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormField>

              <FormField
                id="autoridadEmisoraDocumento"
                labelText={t('formulario.autoridadEmisoraDocumento')}
                error={errors.autoridadEmisoraDocumento}
                fullWidth
              >
                <Controller
                  name="autoridadEmisoraDocumento"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="autoridadEmisoraDocumento"
                      type="text"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={!!errors.autoridadEmisoraDocumento}
                    />
                  )}
                />
              </FormField>
            </FormGrid>
          </Section>

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

            <RowLayout justifyContent="end">
              <Button variant="principal" onClick={() => abrirModal()}>
                {t('palabras.anadir')}
              </Button>
            </RowLayout>
          </Section>
        </SectionGroup>

        <BarraLateral>
          <IndiceLateral />
        </BarraLateral>
      </Main>

      <Modal isOpen={modalDomicilio.abierto} onClose={cerrarModal} size="large" disableCloseOnClickOutside>
        <Modal.Header subtitle={t('formulario.modal.subtitulo')}>
          {t('formulario.modal.titulo')}
        </Modal.Header>
        <Modal.Body>
          <FormGrid>
            <FormField id="calle" labelText={t('formulario.modal.calle')} error={modalErrors.calle}>
              <Controller
                name="calle"
                control={modalControl}
                render={({ field }) => (
                  <Input
                    id="calle"
                    type="text"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!modalErrors.calle}
                  />
                )}
              />
            </FormField>

            <FormField id="numero" labelText={t('formulario.modal.numero')} error={modalErrors.numero}>
              <Controller
                name="numero"
                control={modalControl}
                render={({ field }) => (
                  <Input
                    id="numero"
                    type="text"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!modalErrors.numero}
                  />
                )}
              />
            </FormField>

            <FormField
              id="codigoPostal"
              labelText={t('formulario.modal.codigoPostal')}
              error={modalErrors.codigoPostal}
            >
              <Controller
                name="codigoPostal"
                control={modalControl}
                render={({ field }) => (
                  <Input
                    id="codigoPostal"
                    type="text"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!modalErrors.codigoPostal}
                  />
                )}
              />
            </FormField>

            <FormField id="ciudad" labelText={t('formulario.modal.ciudad')} error={modalErrors.ciudad}>
              <Controller
                name="ciudad"
                control={modalControl}
                render={({ field }) => (
                  <Selector
                    id="ciudad"
                    permitirBusqueda
                    mostrarX
                    opciones={ciudades}
                    idSeleccionado={field.value ?? null}
                    onChange={field.onChange}
                    error={!!modalErrors.ciudad}
                  />
                )}
              />
            </FormField>

            <FormField
              id="provincia"
              labelText={t('formulario.modal.provincia')}
              error={modalErrors.provincia}
            >
              <Controller
                name="provincia"
                control={modalControl}
                render={({ field }) => (
                  <Selector
                    id="provincia"
                    permitirBusqueda
                    mostrarX
                    opciones={provincias}
                    idSeleccionado={field.value ?? null}
                    onChange={field.onChange}
                    error={!!modalErrors.provincia}
                  />
                )}
              />
            </FormField>

            <FormField
              id="tipoResidencia"
              labelText={t('formulario.modal.tipoResidencia')}
              error={modalErrors.tipoResidencia}
            >
              <Controller
                name="tipoResidencia"
                control={modalControl}
                render={({ field }) => (
                  <Selector
                    id="tipoResidencia"
                    permitirBusqueda
                    mostrarX
                    opciones={tiposResidencia}
                    idSeleccionado={field.value ?? null}
                    onChange={field.onChange}
                    error={!!modalErrors.tipoResidencia}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        </Modal.Body>
        <Modal.Footer>
          <TextButton variant="secondary" onClick={cerrarModal}>
            {t('formulario.modal.cancelar')}
          </TextButton>
          <Button variant="principal" onClick={handleModalSubmit(handleGuardarDomicilio)}>
            {t('formulario.modal.guardar')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}
