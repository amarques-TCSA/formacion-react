import { create } from 'zustand';
import { Domicilio } from '../secciones/domicilios/domicilios.model';

type ModalDomicilioStore = {
  isOpen: boolean;
  domicilio: Domicilio | null;
  abrirModal: (domicilio?: Domicilio) => void;
  cerrarModal: () => void;
};

export const useModalDomicilioStore = create<ModalDomicilioStore>((set) => ({
  isOpen: false,
  domicilio: null,
  abrirModal: (domicilio) =>
    set({
      isOpen: true,
      domicilio: domicilio ?? null,
    }),
  cerrarModal: () => set({ isOpen: false, domicilio: null }),
}));
