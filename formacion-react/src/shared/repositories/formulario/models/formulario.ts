import {  DomicilioId } from "@/pages/formulario/components/secciones/domicilios/domicilios.model";

type MaestroItem = { id: number; descripcion: string };

export type FormularioDomicilio = DomicilioId;

export type FormularioMaestros = {
  nacionalidades: MaestroItem[];
  estadosCiviles: MaestroItem[];
  ciudades: MaestroItem[];
  provincias: MaestroItem[];
  tiposResidencia: MaestroItem[];
};

export type EnviarFormularioRequest = Record<string, unknown>;

export type EnviarFormularioResponse = {
  success: boolean;
  message: string;
};

export type OpcionSelector = {
  id: string;
  texto: string;
};

export const mapToOpciones = (items: MaestroItem[]): OpcionSelector[] =>
  items.map(item => ({ id: String(item.id), texto: item.descripcion }));
