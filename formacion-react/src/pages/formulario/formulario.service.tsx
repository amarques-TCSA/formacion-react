import { useMutation, useQuery } from '@tanstack/react-query';

import { EnviarFormularioRequest, IFormularioRepository, mapToOpciones } from '@/shared/repositories/formulario';

type ObtenerFormularioMaestrosProps = {
  formularioRepository: IFormularioRepository;
};

export const ObtenerFormularioMaestros = ({ formularioRepository }: ObtenerFormularioMaestrosProps) => {
  const { data: { nacionalidades, estadosCiviles, ciudades, provincias, tiposResidencia } = {} }
    = useQuery({
      queryKey: ['formulario', 'maestros'],
      queryFn: () => formularioRepository.obtenerMaestros(),
    });

  return {
    nacionalidades: mapToOpciones(nacionalidades ?? []),
    estadosCiviles: mapToOpciones(estadosCiviles ?? []),
    ciudades: mapToOpciones(ciudades ?? []),
    provincias: mapToOpciones(provincias ?? []),
    tiposResidencia: mapToOpciones(tiposResidencia ?? []),
  };
};

export const ObtenerFormularioDomicilios = ({ formularioRepository }: ObtenerFormularioMaestrosProps) => {
  return useQuery({
    queryKey: ['formulario', 'domicilios'],
    queryFn: () => formularioRepository.obtenerDomicilios(),
  });
};

type EnviarFormularioProps = {
  formularioRepository: IFormularioRepository;
};

export const EnviarFormulario = ({ formularioRepository }: EnviarFormularioProps) => {
  return useMutation({
    mutationFn: (data: EnviarFormularioRequest) => formularioRepository.enviarFormulario(data),
    onSuccess: (response) => {
      console.log('Formulario enviado:', response);
    },
  });
};
