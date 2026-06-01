import {
  FormField,
  FormGrid,
  Input,
  InputDate,
  Section,
  Selector,
} from '@tracasa/tracasa-components';
import { t } from 'i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { FormularioSeccionesForm } from '../../../models/formulario.model';

type DocumentoIdentidadSectionProps = {
  control: Control<FormularioSeccionesForm>;
  errors: FieldErrors<FormularioSeccionesForm>;
};

export default function DocumentoIdentidadSection({
  control,
  errors,
}: DocumentoIdentidadSectionProps) {

  const tiposDocumento = [
    { id: 'dni', texto: t('formulario.opcionDocumentoDni') },
    { id: 'pasaporte', texto: t('formulario.opcionDocumentoPasaporte') },
    { id: 'nie', texto: t('formulario.opcionDocumentoNie') },
  ];

  return (
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
                mostrarX={true}
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
  );
}
