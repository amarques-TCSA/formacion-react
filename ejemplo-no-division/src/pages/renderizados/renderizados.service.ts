import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type MaestroClave = 'nacionalidades' | 'estadosCiviles' | 'tiposResidencia';

type MaestroItem = {
  id: number;
  descripcion: string;
};

type MaestroResponse = {
  nacionalidades?: MaestroItem[];
  estadosCiviles?: MaestroItem[];
  tiposResidencia?: MaestroItem[];
};

type UseMaestroQueryOptions = {
  scope: 'unificado' | 'cascada' | 'sin-cascada';
  runId: number;
  enabled?: boolean;
};

export type MaestroQueryResult = {
  startedAtMs: number | null;
  durationMs: number | null;
  dataLength: number;
  isPending: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const endpointPorMaestro: Record<MaestroClave, string> = {
  nacionalidades: '/api/formulario/nacionalidades',
  estadosCiviles: '/api/formulario/estadosCiviles',
  tiposResidencia: '/api/formulario/tiposResidencia',
};

const retrasoExtraPorMaestroMs: Record<MaestroClave, number> = {
  nacionalidades: 1800,
  estadosCiviles: 2400,
  tiposResidencia: 3000,
};

const esperar = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

const obtenerMaestro = async (maestro: MaestroClave): Promise<MaestroItem[]> => {
  const response = await fetch(endpointPorMaestro[maestro]);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${maestro}`);
  }

  const payload = (await response.json()) as MaestroResponse;
  await esperar(retrasoExtraPorMaestroMs[maestro]);
  return payload[maestro] ?? [];
};

export const useMaestroQuery = (
  maestro: MaestroClave,
  options: UseMaestroQueryOptions,
): MaestroQueryResult => {
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);

  const query = useQuery({
    queryKey: ['renderizados', options.scope, options.runId, maestro],
    enabled: options.enabled ?? true,
    retry: false,
    queryFn: async () => {
      const start = Date.now();
      setStartedAtMs(start);

      const data = await obtenerMaestro(maestro);
      setDurationMs(Date.now() - start);
      return data;
    },
  });

  return {
    startedAtMs,
    durationMs,
    dataLength: query.data?.length ?? 0,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};
