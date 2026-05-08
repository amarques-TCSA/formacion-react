import { create } from 'zustand';
import { Domicilio } from '../secciones/domicilios/domicilios.model';

type ModalDomicilioStore = {
  abierto: boolean;
  domicilio: Domicilio | null;
  abrirModal: (domicilio?: Domicilio) => void;
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
