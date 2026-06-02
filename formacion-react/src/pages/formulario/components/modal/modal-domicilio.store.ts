import { create } from 'zustand';
import { DomicilioId } from '../secciones/domicilios/domicilios.model';

type ModalDomicilioStore = {
  abierto: boolean;
  domicilio: DomicilioId | null;
  abrirModal: (domicilio?: DomicilioId) => void;
  cerrarModal: () => void;
};

export const useModalDomicilioStore = create<ModalDomicilioStore>((set) => ({
  abierto: false,
  domicilio: null,
  abrirModal: (domicilio) =>
    set({
      abierto: true,
      domicilio: domicilio ?? null,
    }),
  cerrarModal: () => set({ abierto: false, domicilio: null }),
}));
