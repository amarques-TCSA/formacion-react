import { create } from 'zustand';

export type DomicilioEdicion = {
  id: number;
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  tipoResidencia: string;
};

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
