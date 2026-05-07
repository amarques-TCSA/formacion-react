import { BarraHerramientas, BarraLateral, Button, FormField, FormGrid, IndiceLateral, Input, InputDate, InputDateTime, Main, Mensaje, Section, SectionGroup, Selector } from "@tracasa/tracasa-components";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";

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
}

export default function FormularioPage() {

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

        </Section>
      </SectionGroup>
      <BarraLateral>
        <IndiceLateral />
      </BarraLateral>
    </Main>
  </>;
}
