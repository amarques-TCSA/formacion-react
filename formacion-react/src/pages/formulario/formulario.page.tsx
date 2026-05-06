import { BarraHerramientas, Button, FormField, FormGrid, Input, Main, Section } from "@tracasa/tracasa-components";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";

type ModalCreacionEventoEspecialForm = {
  nombre: string;
}

export default function FormularioPage() {

  const {
    control,
    formState: { errors },
  } = useForm<ModalCreacionEventoEspecialForm>({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
    },
  });

  return <>
    <BarraHerramientas>
      <Button textoAccesibilidad={t('palabras.cancelar')} onClick={() => { }}>
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
        disabled={false}
      >
        {t('palabras.guardar')}
      </Button>
    </BarraHerramientas>
    <Main>
      <Section
        title={t('formulario.datosPersonales')}
        id="datosGeneralesExpedientePsicosocial"
      >
        <FormGrid>
          <FormField
            id="nombreEvento"
            labelText={t('formulario.nombre')}
            layout="horizontal"
            fullWidth
            error={errors.nombre}
          >
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <Input
                  id="nombreEvento"
                  type="text"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  error={!!errors.nombre}
                />
              )}
            />
          </FormField>
        </FormGrid>
      </Section>
    </Main>
  </>;
}
