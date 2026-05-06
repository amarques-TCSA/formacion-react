import { BarraHerramientas, BarraLateral, Button, FormField, FormGrid, IndiceLateral, Input, Main, Section, SectionGroup } from "@tracasa/tracasa-components";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";

type ModalCreacionEventoEspecialForm = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  lugarNacimiento: string;
}

export default function FormularioPage() {

  const {
    control,
    formState: { errors },
  } = useForm<ModalCreacionEventoEspecialForm>({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      lugarNacimiento: '',
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
          </FormGrid>
        </Section>
      </SectionGroup>
      <BarraLateral>
        <IndiceLateral />
      </BarraLateral>
    </Main>
  </>;
}
