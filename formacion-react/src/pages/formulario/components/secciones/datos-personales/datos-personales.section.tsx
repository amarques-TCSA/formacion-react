import {
  FormField,
  FormGrid,
  Input,
  InputDate,
  InputDateTime,
  Section,
  Selector,
} from '@tracasa/tracasa-components';
import { t } from 'i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { IFormularioRepository } from '@/shared/repositories/formulario';
import { ObtenerFormularioMaestros } from '../../../formulario.service';
import { FormularioSeccionesForm } from '../../../models/formulario.model';

type DatosPersonalesSectionProps = {
  control: Control<FormularioSeccionesForm>;
  errors: FieldErrors<FormularioSeccionesForm>;
  formularioRepository: IFormularioRepository;
  register: any;
};

export default function DatosPersonalesSection({
  control,
  errors,
  formularioRepository,
  register,
}: DatosPersonalesSectionProps) {

  const { nacionalidades, estadosCiviles } = ObtenerFormularioMaestros({ formularioRepository });

  return (
    <Section title={t('formulario.datosPersonales')} id="datosPersonales">
      <FormGrid>
        <FormField id="nombre" labelText={t('formulario.nombre')} error={errors.nombre}>

          <Input
            error={!!errors.nombre}
            {...register("nombre")}
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

        <FormField labelText={t('formulario.nacionalidad')} id="nacionalidad" error={errors.nacionalidad}>
          <Controller
            control={control}
            name="nacionalidad"
            render={({ field }) => (
              <Selector
                permitirBusqueda
                mostrarX={true}
                id="nacionalidad"
                opciones={nacionalidades}
                idSeleccionado={field.value?.toString() ?? null}
                onChange={field.onChange}
                error={!!errors.nacionalidad}
              />
            )}
          />
        </FormField>

        <FormField labelText={t('formulario.estadoCivil')} id="estadoCivil" error={errors.estadoCivil}>
          <Controller
            control={control}
            name="estadoCivil"
            render={({ field }) => (
              <Selector
                permitirBusqueda
                mostrarX={true}
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
  );
}
