import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  BarraHerramientas,
  BarraLateral,
  Button,
  Form,
  IndiceLateral,
  Main,
  SectionGroup,
} from '@tracasa/tracasa-components';

import { useFormHook } from '@/shared/hooks/use-form-hook';

import DatosPersonalesSection from './components/sections/datos-personales/datos-personales.section';
import DocumentoIdentidadSection from './components/sections/documento-identidad/documento-identidad.section';
import DomicilioSection from './components/sections/domicilios/domicilios.section';
import { FormularioSeccionesForm } from './components/sections/formulario-secciones.model';
import { formularioSeccionesSchema } from './components/sections/formulario-secciones.schema';

import { defaultFormularioValues } from './models/formulario';

export default function FormularioPage() {
  const registro = useForm<FormularioSeccionesForm>({
    mode: 'onSubmit',
    resolver: yupResolver(formularioSeccionesSchema),
    defaultValues: {
      ...defaultFormularioValues
    },
  });

  const { control, reset, formState: { errors } } = registro;

  const onSubmit = (data: FormularioSeccionesForm) => {
    console.log('Guardando formulario...', data);
  };

  const { handleKeyPress } = useFormHook({
    registro,
    onSubmit,
  });

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
        <Button
          type="submit"
          variant="principal"
          conOpciones
        >
          {t('palabras.guardar')}
        </Button>
      </BarraHerramientas>

      <Main>
        <SectionGroup>
          <DatosPersonalesSection control={control} errors={errors} />
          <DocumentoIdentidadSection control={control} errors={errors} />
          <DomicilioSection />
        </SectionGroup>

        <BarraLateral>
          <IndiceLateral />
        </BarraLateral>

      </Main>
    </Form>
  );
}
