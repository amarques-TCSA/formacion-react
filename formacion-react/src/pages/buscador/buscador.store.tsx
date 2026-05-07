import { create } from "zustand";
import { BuscadorForm } from "./models/buscador.schema";

export const filtrosPorDefecto: BuscadorForm = {
  fechaDesde: null,
  fechaHasta: null,
  idEstadoSolicitud: null,
};

type FiltrosStore = {
  filtros: BuscadorForm;
  setFiltros: (filtros: BuscadorForm) => void;
}

export const useFiltrosStore = create<FiltrosStore>((set) => ({
  filtros: filtrosPorDefecto,
  setFiltros: (filtros:BuscadorForm) => set({ filtros }),
}))
