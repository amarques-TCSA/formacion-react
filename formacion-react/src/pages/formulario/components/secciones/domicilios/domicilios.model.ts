export type DomicilioForm = {
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  tipoResidencia: string;
};

export type DomicilioId = DomicilioForm & {
  id: number;
  fechaInicio: string;
  actual: boolean;
};

export type DomicilioListado = {
  direccion: string;
  tipoResidencia: string;
  fechaInicio: string;
  actual: string;
};

export const defaultFormularioValues = {
  calle: '',
  numero: '',
  codigoPostal: '',
  ciudad: '',
  tipoResidencia: '',
};
