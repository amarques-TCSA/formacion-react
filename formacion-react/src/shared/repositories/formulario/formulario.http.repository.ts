import axios from 'axios';

import { IFormularioRepository } from './formulario.repository';
import { EnviarFormularioRequest, EnviarFormularioResponse, FormularioMaestros } from './models/formulario';

export const FormularioHttpRepository = (): IFormularioRepository => {
  return {
    obtenerMaestros: async (): Promise<FormularioMaestros> => {
      const response = await axios.get<FormularioMaestros>('/api/formulario/maestros');
      return response.data;
    },

    enviarFormulario: async (request: EnviarFormularioRequest): Promise<EnviarFormularioResponse> => {
      const response = await axios.post<EnviarFormularioResponse>('/api/formulario/enviar', request);
      return response.data;
    },
  };
};
