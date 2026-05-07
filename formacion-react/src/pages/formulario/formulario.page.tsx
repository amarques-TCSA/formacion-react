import { createColumnHelper } from "@tanstack/react-table";
import {
  BarraHerramientas,
  BarraLateral,
  Button,
  createColumnDefs,
  ElementoListadoProps,
  FormField,
  FormGrid,
  IndiceLateral,
  Input,
  InputDate,
  InputDateTime,
  ListadoPaginado,
  Main,
  Mensaje,
  Section,
  SectionGroup,
  Selector,
  TiposOrden,
} from "@tracasa/tracasa-components";
import { t } from "i18next";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ModalDomicilio, { DomicilioForm } from "./components/modal-domicilio";
import { useModalDomicilioStore } from "./components/modal-domicilio.store";

type ModalCreacionEventoEspecialForm = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  lugarNacimiento: string;
  nacionalidad: string;
  estadoCivil: string;
  fechaRegistro: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicionDocumento: string;
  fechaCaducidadDocumento: string;
  autoridadEmisoraDocumento: string;
};

type DomicilioListado = {
  direccion: string;
  tipoResidencia: string;
  fechaInicio: string;
  actual: string;
};

type DomicilioItem = DomicilioForm & {
  id: number;
  fechaInicio: string;
  actual: string;
};

const domiciliosIniciales: DomicilioItem[] = [
  {
    id: 1,
    calle: "Garajonay",
    numero: "11",
    codigoPostal: "31621",
    ciudad: "sarriguren",
    provincia: "navarra",
    tipoResidencia: "Propia",
    fechaInicio: "22/03/2020",
    actual: "✓",
  },
  {
    id: 2,
    calle: "C. Bardenas Reales",
    numero: "52-54",
    codigoPostal: "31621",
    ciudad: "sarriguren",
    provincia: "navarra",
    tipoResidencia: "Alquiler",
    fechaInicio: "25/11/2003",
    actual: "✕",
  },
];

const columnasDomicilios = createColumnDefs(
  createColumnHelper<ElementoListadoProps<DomicilioListado>>(),
  [
    {
      id: "direccion",
      texto: "Direccion",
      tipo: "texto",
      tamano: 33,
      alinear: "izquierda",
    },
    {
      id: "tipoResidencia",
      texto: "Tipo de residencia",
      tipo: "texto",
      tamano: 20,
      alinear: "izquierda",
    },
    {
      id: "fechaInicio",
      texto: "Fecha de inicio",
      tipo: "texto",
      tamano: 20,
      alinear: "izquierda",
    },
    {
      id: "actual",
      texto: "Actual",
      tipo: "texto",
      tamano: 20,
      alinear: "centro",
    },
  ],
);

export default function FormularioPage() {
  const abrirModal = useModalDomicilioStore(x => x.abrirModal);
  const [domicilios, setDomicilios] = useState(domiciliosIniciales);

  const handleEliminarDomicilio = (id: number) => {
    setDomicilios((prev) => prev.filter((domicilio) => domicilio.id !== id));
  };

  const handleEditarDomicilio = (id: number) => {
    const domicilio = domicilios.find((item) => item.id === id);
    if (!domicilio) {
      return;
    }
    abrirModal({
      id: domicilio.id,
      calle: domicilio.calle,
      numero: domicilio.numero,
      codigoPostal: domicilio.codigoPostal,
      ciudad: domicilio.ciudad,
      provincia: domicilio.provincia,
      tipoResidencia: domicilio.tipoResidencia,
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
    direccion: `${domicilio.calle}, ${domicilio.numero}, ${domicilio.codigoPostal} ${domicilio.ciudad}, ${domicilio.provincia}`,
    tipoResidencia: domicilio.tipoResidencia,
    fechaInicio: domicilio.fechaInicio,
    actual: domicilio.actual,
    acciones: [
      {
        textoDescriptivo: 'Editar',
        accion: () => handleEditarDomicilio(domicilio.id),
      },
      {
        textoDescriptivo: 'Eliminar',
        accion: () => handleEliminarDomicilio(domicilio.id),
      },
    ],
  }));

  const {
    control,
    formState: { errors },
  } = useForm<ModalCreacionEventoEspecialForm>({
    mode: 'onChange',
    defaultValues: {
      nombre: undefined,
      primerApellido: undefined,
      segundoApellido: undefined,
      lugarNacimiento: undefined,
      estadoCivil: undefined,
      nacionalidad: undefined,
      fechaRegistro: undefined,
      fechaNacimiento: undefined,
      tipoDocumento: undefined,
      numeroDocumento: undefined,
      fechaExpedicionDocumento: undefined,
      fechaCaducidadDocumento: undefined,
      autoridadEmisoraDocumento: undefined,
    },
  });

  return <>
    <BarraHerramientas>
      <Button onClick={() => { }}>
        {t('palabras.cancelar')}
      </Button>
      <Button
        opciones={[
          {
            onClick: () => { },
            text: t('palabras.guardar'),
          },
          {
            onClick: () => { },
            text: t('palabras.guardarYSalir'),
          },
        ]}
        variant="principal"
        conOpciones
      >
        {t('palabras.guardar')}
      </Button>
    </BarraHerramientas>
    <Main>
      <SectionGroup>
        <Section
          title={t('formulario.datosPersonales')}
          id="datosPersonales"
        >
          <FormGrid>
            <FormField
              id="nombre"
              labelText={t('formulario.nombre')}
              error={errors.nombre}
            >
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
              error={errors?.fechaRegistro}
              id="fechaRegistro"
            >
              <Controller
                name="fechaRegistro"
                control={control}
                render={({ field }) => (
                  <InputDateTime
                    id="fechaRegistro"
                    error={!!errors?.fechaRegistro}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormField>

            <FormField
              labelText={t('formulario.fechaNacimiento')}
              error={errors?.fechaNacimiento}
              id="fechaNacimiento"
            >
              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field }) => (
                  <InputDate
                    id="fechaNacimiento"
                    error={!!errors?.fechaNacimiento}
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

            <FormField labelText={t('formulario.nacionalidad')} id="nacionalidad">
              <Controller
                control={control}
                name="nacionalidad"
                render={({ field }) => (
                  <Selector
                    permitirBusqueda
                    mostrarX={true}
                    id="nacionalidad"
                    opciones={[]}
                    idSeleccionado={field.value?.toString() ?? null}
                    onChange={field.onChange}
                    error={!!errors.nacionalidad}
                  />
                )}
              />
            </FormField>

            <FormField labelText={t('formulario.estadoCivil')} id="estadoCivil">
              <Controller
                control={control}
                name="estadoCivil"
                render={({ field }) => (
                  <Selector
                    permitirBusqueda
                    mostrarX={true}
                    id="estadoCivil"
                    opciones={[]}
                    idSeleccionado={field.value?.toString() ?? null}
                    onChange={field.onChange}
                    error={!!errors.estadoCivil}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        </Section>

        <Section
          title={t('formulario.documentoIdentidad')}
          id="documentoIdentidad"
        >
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
                    mostrarX={true}
                    id="tipoDocumento"
                    opciones={[
                      { id: 'dni', texto: t('formulario.opcionDocumentoDni') },
                      { id: 'pasaporte', texto: t('formulario.opcionDocumentoPasaporte') },
                      { id: 'nie', texto: t('formulario.opcionDocumentoNie') },
                    ]}
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
              error={errors?.fechaExpedicionDocumento}
              id="fechaExpedicionDocumento"
            >
              <Controller
                name="fechaExpedicionDocumento"
                control={control}
                render={({ field }) => (
                  <InputDate
                    id="fechaExpedicionDocumento"
                    error={!!errors?.fechaExpedicionDocumento}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormField>

            <FormField
              labelText={t('formulario.fechaCaducidadDocumento')}
              error={errors?.fechaCaducidadDocumento}
              id="fechaCaducidadDocumento"
            >
              <Controller
                name="fechaCaducidadDocumento"
                control={control}
                render={({ field }) => (
                  <InputDate
                    id="fechaCaducidadDocumento"
                    error={!!errors?.fechaCaducidadDocumento}
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

        <Section
          title={t('formulario.domicilio')}
          id="domicilio"
        >
          <Mensaje
            message={t('formulario.mensajeDomicilio')}
            variant="info"
          />

          <ListadoPaginado
            datos={domiciliosListado}
            columnas={columnasDomicilios}
            indice={0}
            tamanoPagina={5}
            ordenarPor="fechaInicio"
            tipoOrden={TiposOrden.Ascendente}
            mostrarPaginacion={false}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem" }}>
            <Button variant="principal" onClick={() => abrirModal()}>Añadir</Button>
          </div>
        </Section>
      </SectionGroup>
      <BarraLateral>
        <IndiceLateral />
      </BarraLateral>
    </Main>
    <ModalDomicilio onGuardar={handleGuardarDomicilio} />
  </>;
}
