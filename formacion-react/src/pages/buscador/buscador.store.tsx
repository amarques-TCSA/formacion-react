import { create } from "zustand";
import { BuscadorForm } from "./models/buscador.schema";

const filtrosPorDefecto: BuscadorForm = {
  fechaDesde: undefined,
  fechaHasta: undefined,
  idEstadoSolicitud: undefined,
};

type FiltrosStore = {
  filtros: BuscadorForm;
  setFiltros: (filtros: BuscadorForm) => void;
}

export const useFiltrosStore = create<FiltrosStore>((set) => ({
  filtros: filtrosPorDefecto,
  setFiltros: (filtros:BuscadorForm) => set({ filtros }),
}))
