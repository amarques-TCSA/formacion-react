import { create } from 'zustand';
import { DomicilioEdicion } from './sections/domicilios/domicilios.model';

type ModalDomicilioStore = {
  isOpen: boolean;
  domicilioEnEdicion: DomicilioEdicion | null;
  abrirModal: (domicilio?: DomicilioEdicion) => void;
  cerrarModal: () => void;
};

export const useModalDomicilioStore = create<ModalDomicilioStore>((set) => ({
  isOpen: false,
  domicilioEnEdicion: null,
  abrirModal: (domicilio) =>
    set({
      isOpen: true,
      domicilioEnEdicion: domicilio ?? null,
    }),
  cerrarModal: () => set({ isOpen: false, domicilioEnEdicion: null }),
}));
