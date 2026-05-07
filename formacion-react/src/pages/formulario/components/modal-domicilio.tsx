import {
  Button,
  FormField,
  FormGrid,
  Input,
  Modal,
  Selector,
  TextButton,
} from '@tracasa/tracasa-components';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DomicilioForm } from './sections/domicilios/domicilios.model';
import { domiciliosSchema } from './sections/domicilios/domicilios.schema';
import {
  obtenerCiudades,
  obtenerProvincias,
  obtenerTiposResidencia,
} from './modal-domicilio.inputs';
import { useModalDomicilioStore } from './modal-domicilio.store';

type ModalDomicilioProps = {
  onGuardar: (datos: DomicilioForm, idEdicion?: number) => void;
};

export default function ModalDomicilio({ onGuardar }: ModalDomicilioProps) {
  const cerrarModal = useModalDomicilioStore(x => x.cerrarModal);
  const domicilioEnEdicion = useModalDomicilioStore(x => x.domicilioEnEdicion);
  const isOpen = useModalDomicilioStore(x => x.isOpen);

  const { data: ciudades = [] } = useQuery({
    queryKey: ['formulario', 'modal-domicilio', 'ciudades'],
    queryFn: obtenerCiudades,
  });

  const { data: provincias = [] } = useQuery({
    queryKey: ['formulario', 'modal-domicilio', 'provincias'],
    queryFn: obtenerProvincias,
  });

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<DomicilioForm>({
    defaultValues: {
      calle: '',
      numero: '',
      codigoPostal: '',
      ciudad: '',
      provincia: '',
      tipoResidencia: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (domicilioEnEdicion) {
      reset({
        calle: domicilioEnEdicion.calle,
        numero: domicilioEnEdicion.numero,
        codigoPostal: domicilioEnEdicion.codigoPostal,
        ciudad: domicilioEnEdicion.ciudad,
        provincia: domicilioEnEdicion.provincia,
        tipoResidencia: domicilioEnEdicion.tipoResidencia,
      });
      return;
    }

    reset({
      calle: '',
      numero: '',
      codigoPostal: '',
      ciudad: '',
      provincia: '',
      tipoResidencia: '',
    });
  }, [isOpen, domicilioEnEdicion, reset]);

  const handleCancelar = () => {
    reset();
    cerrarModal();
  };

  const handleGuardar = (datos: DomicilioForm) => {
    clearErrors();

    try {
      domiciliosSchema.validateSync(datos, { abortEarly: false });
    } catch (error) {
      if (error instanceof Error && 'inner' in error) {
        const validationError = error as { inner: Array<{ path?: string; message: string }> };
        validationError.inner.forEach((itemError) => {
          if (itemError.path) {
            setError(itemError.path as keyof DomicilioForm, {
              type: 'manual',
              message: itemError.message,
            });
          }
        });
        return;
      }
      return;
    }

    onGuardar(datos, domicilioEnEdicion?.id);
    reset();
    cerrarModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancelar} size="large" disableCloseOnClickOutside>
      <Modal.Header subtitle={t('formulario.modal.subtitulo')}>{t('formulario.modal.titulo')}</Modal.Header>
      <Modal.Body>
        <FormGrid>
          <FormField id="calle" labelText={t('formulario.modal.calle')} error={errors.calle}>
            <Controller
              name="calle"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="calle"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.calle}
                />
              )}
            />
          </FormField>

          <FormField id="numero" labelText={t('formulario.modal.numero')} error={errors.numero}>
            <Controller
              name="numero"
              control={control}
              render={({ field }) => (
                <Input
                  id="numero"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.numero}
                />
              )}
            />
          </FormField>

          <FormField id="codigoPostal" labelText={t('formulario.modal.codigoPostal')} error={errors.codigoPostal}>
            <Controller
              name="codigoPostal"
              control={control}
              render={({ field }) => (
                <Input
                  id="codigoPostal"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.codigoPostal}
                />
              )}
            />
          </FormField>

          <FormField id="ciudad" labelText={t('formulario.modal.ciudad')} error={errors.ciudad}>
            <Controller
              name="ciudad"
              control={control}
              render={({ field }) => (
                <Selector
                  id="ciudad"
                  permitirBusqueda
                  mostrarX
                  opciones={ciudades}
                  idSeleccionado={field.value ?? null}
                  onChange={field.onChange}
                  error={!!errors.ciudad}
                />
              )}
            />
          </FormField>

          <FormField id="provincia" labelText={t('formulario.modal.provincia')} error={errors.provincia}>
            <Controller
              name="provincia"
              control={control}
              render={({ field }) => (
                <Selector
                  id="provincia"
                  permitirBusqueda
                  mostrarX
                  opciones={provincias}
                  idSeleccionado={field.value ?? null}
                  onChange={field.onChange}
                  error={!!errors.provincia}
                />
              )}
            />
          </FormField>

          <FormField id="tipoResidencia" labelText={t('formulario.modal.tipoResidencia')} error={errors.tipoResidencia}>
            <Controller
              name="tipoResidencia"
              control={control}
              render={({ field }) => (
                <Selector
                  id="tipoResidencia"
                  permitirBusqueda
                  mostrarX
                  opciones={obtenerTiposResidencia()}
                  idSeleccionado={field.value ?? null}
                  onChange={field.onChange}
                  error={!!errors.tipoResidencia}
                />
              )}
            />
          </FormField>
        </FormGrid>
      </Modal.Body>
      <Modal.Footer>
        <TextButton variant="secondary" onClick={handleCancelar}>
          {t('formulario.modal.cancelar')}
        </TextButton>
        <Button variant="principal" onClick={handleSubmit(handleGuardar)}>
          {t('formulario.modal.guardar')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
