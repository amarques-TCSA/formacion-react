export type DomicilioForm = {
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  tipoResidencia: string;
};

export const defaultFormularioValues = {
  calle: '',
  numero: '',
  codigoPostal: '',
  ciudad: '',
  provincia: '',
  tipoResidencia: '',
};

export type Domicilio = DomicilioForm & {
  id: number;
};

export type DomicilioItem = DomicilioForm & {
  id: number;
  fechaInicio: string;
  actual: string;
};

export type DomicilioListado = {
  direccion: string;
  tipoResidencia: string;
  fechaInicio: string;
  actual: string;
};

export type OpcionSelector = {
  id: string;
  texto: string;
};
