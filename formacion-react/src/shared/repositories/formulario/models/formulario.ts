type MaestroItem = { id: number; descripcion: string };

export type FormularioDomicilio = {
  id: number;
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  tipoResidencia: string;
  fechaInicio: string;
  actual: string;
};

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
