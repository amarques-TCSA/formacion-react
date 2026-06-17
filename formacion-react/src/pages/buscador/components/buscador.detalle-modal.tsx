import { Button, FormField, Input, Modal, StackLayout, TextButton } from "@tracasa/tracasa-components";
import { useBuscadorStore } from "../buscador.store";


export default function BuscadorDetalleModal() {
  const modalAbierta = useBuscadorStore(x => x.modalAbierta);
  const setModalAbierta = useBuscadorStore(x => x.setModalAbierta);
  const datosModal = useBuscadorStore(x => x.datosModal);
  const setDatosModal = useBuscadorStore(x => x.setDatosModal);

  const cerrarModal = () => {
    setModalAbierta(false);
    setDatosModal(undefined);
  };

  return (
    <Modal isOpen={modalAbierta} onClose={cerrarModal} size="full">
      <Modal.Header>Detalle</Modal.Header>
      <Modal.Body>
        <StackLayout>
          <FormField
            id="nombre"
            labelText="Nombre"
          >
            <Input
              title="Nombre"
              readOnly
              value={datosModal?.nombreCompleto}
            />
          </FormField>
          <FormField
            id="fechaRegistro"
            labelText="Fecha registro"
          >
            <Input
              title="Fecha registro"
              readOnly
              value={datosModal?.fechaRegistro.format('DD/MM/YYYY')}
            />
          </FormField>
          <FormField
            id="estadoSolicitud"
            labelText="Estado solicitud"
          >
            <Input
              title="Estado solicitud"
              readOnly
              value={datosModal?.estadoSolicitud}
            />
          </FormField>
        </StackLayout>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={cerrarModal}
          textoAccesibilidad="Cerrar"
          variant="principal"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
