import { useMutation, useQuery } from '@tanstack/react-query';

import { EnviarFormularioRequest, IFormularioRepository, mapToOpciones } from '@/shared/repositories/formulario';

type ObtenerFormularioMaestrosProps = {
  formularioRepository: IFormularioRepository;
};

export const ObtenerFormularioMaestros = ({ formularioRepository }: ObtenerFormularioMaestrosProps) => {
  const query = useQuery({
    queryKey: ['formulario', 'maestros'],
    queryFn: () => formularioRepository.obtenerMaestros(),
  });

  return {
    ...query,
    nacionalidades: mapToOpciones(query.data?.nacionalidades ?? []),
    estadosCiviles: mapToOpciones(query.data?.estadosCiviles ?? []),
    ciudades: mapToOpciones(query.data?.ciudades ?? []),
    provincias: mapToOpciones(query.data?.provincias ?? []),
    tiposResidencia: mapToOpciones(query.data?.tiposResidencia ?? []),
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
