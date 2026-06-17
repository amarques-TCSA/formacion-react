import { QueryKey } from '@tanstack/react-query';

export type EstadoCarga = 'sin-cargar' | 'cargando' | 'cargado' | 'error';

type MaestroItem = {
  id: number;
  descripcion: string;
};

type MaestroClave = 'nacionalidades' | 'estadosCiviles';

type MaestroResponse = {
  nacionalidades?: MaestroItem[];
  estadosCiviles?: MaestroItem[];
};

const endpointPorMaestro: Record<MaestroClave, string> = {
  nacionalidades: '/api/formulario/nacionalidades',
  estadosCiviles: '/api/formulario/estadosCiviles',
};

const retrasoMs: Record<MaestroClave, number> = {
  nacionalidades: 1700,
  estadosCiviles: 2500,
};

const esperar = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

export const obtenerMaestro = async (maestro: MaestroClave): Promise<MaestroItem[]> => {
  const response = await fetch(endpointPorMaestro[maestro]);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${maestro}`);
  }

  const payload = (await response.json()) as MaestroResponse;
  await esperar(retrasoMs[maestro]);
  return payload[maestro] ?? [];
};

export const queryKeyPeticionUno = (runId: number): QueryKey => ['query-vs-suspense', 'peticion-uno', runId];

export const queryKeyPeticionDos = (runId: number): QueryKey => ['query-vs-suspense', 'peticion-dos', runId];

export const estadoDesdeQuery = (
  {
    isPending,
    isFetching,
    isSuccess,
    isError,
  }: {
    isPending: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
  },
  enabled: boolean,
): EstadoCarga => {
  if (!enabled) {
    return 'sin-cargar';
  }

  if (isPending || isFetching) {
    return 'cargando';
  }

  if (isSuccess) {
    return 'cargado';
  }

  if (isError) {
    return 'error';
  }

  return 'sin-cargar';
};
