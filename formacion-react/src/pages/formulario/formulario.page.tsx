import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  Button,
  Form,
  LayoutSPA,
  Main,
  SectionGroup,
} from '@tracasa/tracasa-components';

import { useFormHook } from '@/shared/hooks/use-form-hook';
import { IFormularioRepository } from '@/shared/repositories/formulario';

import DatosPersonalesSection from './components/secciones/datos-personales/datos-personales.section';
import DocumentoIdentidadSection from './components/secciones/documento-identidad/documento-identidad.section';
import DomicilioSection from './components/secciones/domicilios/domicilios.section';
import { FormularioSeccionesForm } from './models/formulario.model';
import { formularioSeccionesSchema } from './models/formulario.schema';
import { defaultFormularioValues } from './models/formulario';
import { EnviarFormulario } from './formulario.service';

type FormularioPageProps = {
  formularioRepository: IFormularioRepository;
};

export default function FormularioPage({ formularioRepository }: FormularioPageProps) {

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

  const { control, reset, formState: { errors } } = registro;

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

  const acciones = <>
    <Button onClick={() => { }}>{t('palabras.cancelar')}</Button>
    <Button
      type="submit"
      variant="principal"
      conOpciones
    >
      {t('palabras.guardar')}
    </Button>
  </>;

  return (
    <Form
      registro={registro}
      onReset={reset}
      onSubmit={onSubmit}
      data-testid="buscador-expedientes-fiscalia-form"
      onKeyDown={handleKeyPress}
    >
      <LayoutSPA titulo={"Formulario"} accionesRender={acciones}>
        <Main>
          <SectionGroup>
            <DatosPersonalesSection
              control={control}
              errors={errors}
              formularioRepository={formularioRepository} />

            <DocumentoIdentidadSection
              control={control}
              errors={errors}
            />

            <DomicilioSection
              control={control}
              formularioRepository={formularioRepository}
            />
          </SectionGroup>
        </Main>
      </LayoutSPA>
    </Form>
  );
}
