import { EnviarFormularioRequest, EnviarFormularioResponse, FormularioMaestros } from './models/formulario';

export type IFormularioRepository = {
  obtenerMaestros(): Promise<FormularioMaestros>;
  enviarFormulario(request: EnviarFormularioRequest): Promise<EnviarFormularioResponse>;
};
