import {
  Button,
  FormField,
  FormGrid,
  Input,
  Modal,
  Selector,
  TextButton,
} from '@tracasa/tracasa-components';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';

import { DomicilioForm } from '../secciones/domicilios/domicilios.model';
import { domiciliosSchema } from '../secciones/domicilios/domicilios.schema';
import { IFormularioRepository } from '@/shared/repositories/formulario';
import { ObtenerFormularioMaestros } from '../../formulario.service';
import { useModalDomicilioStore } from './modal-domicilio.store';
import { yupResolver } from '@hookform/resolvers/yup';

type ModalDomicilioProps = {
  onGuardar: (datos: DomicilioForm, idEdicion?: number) => void;
  formularioRepository: IFormularioRepository;
};

export default function ModalDomicilio({ onGuardar, formularioRepository }: ModalDomicilioProps) {
  const cerrarModal = useModalDomicilioStore(x => x.cerrarModal);
  const domicilio = useModalDomicilioStore(x => x.domicilio);
  const isOpen = useModalDomicilioStore(x => x.abierto);

  const { ciudades, tiposResidencia } = ObtenerFormularioMaestros({ formularioRepository });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DomicilioForm>({
    defaultValues: { ...domicilio },
    resolver: yupResolver(domiciliosSchema)
  });

  const handleCancelar = () => {
    reset();
    cerrarModal();
  };

  const handleGuardar = (datos: DomicilioForm) => {
    onGuardar(datos, domicilio?.id);
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

          <FormField id="tipoResidencia" labelText={t('formulario.modal.tipoResidencia')} error={errors.tipoResidencia}>
            <Controller
              name="tipoResidencia"
              control={control}
              render={({ field }) => (
                <Selector
                  id="tipoResidencia"
                  permitirBusqueda
                  mostrarX
                  opciones={tiposResidencia}
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
