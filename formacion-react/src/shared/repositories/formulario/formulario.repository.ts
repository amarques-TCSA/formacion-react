import {
  EnviarFormularioRequest,
  EnviarFormularioResponse,
  FormularioDomicilio,
  FormularioMaestros,
} from './models/formulario';

export type IFormularioRepository = {
  obtenerMaestros(): Promise<FormularioMaestros>;
  obtenerDomicilios(): Promise<FormularioDomicilio[]>;
  enviarFormulario(request: EnviarFormularioRequest): Promise<EnviarFormularioResponse>;
};
