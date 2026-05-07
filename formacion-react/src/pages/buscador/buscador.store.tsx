import { create } from "zustand";
import { BuscadorForm } from "./models/buscador.schema";
import { Resultado } from "./models/resultado.model";

export const filtrosPorDefecto: BuscadorForm = {
  fechaDesde: null,
  fechaHasta: null,
  idEstadoSolicitud: null,
  idEstadoCivil: null,
};

type BuscadorStore = {
  filtros: BuscadorForm;
  setFiltros: (filtros: BuscadorForm) => void;
  modalAbierta: boolean;
  setModalAbierta: (abierta: boolean) => void;
  datosModal?: Resultado;
  setDatosModal : (datos?: Resultado) => void;
}

export const useBuscadorStore = create<BuscadorStore>((set) => ({
  filtros: filtrosPorDefecto,
  setFiltros: (filtros) => set({ filtros }),
  modalAbierta: false,
  setModalAbierta: (abierta) => set({ modalAbierta: abierta }),
  datosModal: undefined,
  setDatosModal: (datos) => set({ datosModal: datos })
}))
