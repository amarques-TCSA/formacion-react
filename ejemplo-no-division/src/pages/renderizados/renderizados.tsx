import './renderizados.css';

import { PropsWithChildren, useState } from 'react';

import {
  MaestroQueryResult,
  useMaestroQuery,
} from './renderizados.service';

type EstadoCarga = 'sin-renderizar' | 'cargando' | 'cargado' | 'error';

const inicioReferenciaMs = Date.now();

type CajaRenderProps = {
  nombreComponente: string;
  query: MaestroQueryResult;
  inicioReferenciaMs: number;
};

const obtenerEstado = (query: MaestroQueryResult): EstadoCarga => {
  if (!query.startedAtMs) {
    return 'sin-renderizar';
  }

  if (query.isPending || query.isFetching) {
    return 'cargando';
  }

  if (query.isSuccess) {
    return 'cargado';
  }

  if (query.isError) {
    return 'error';
  }

  return 'sin-renderizar';
};

const segundoInicioRelativo = (startedAtMs: number | null, inicioReferenciaMs: number): string => {
  if (!startedAtMs) {
    return '-';
  }

  const deltaSegundos = Math.floor((startedAtMs - inicioReferenciaMs) / 1000);
  return String(Math.max(0, deltaSegundos));
};

const duracionSegundos = (durationMs: number | null): string => {
  if (durationMs === null) {
    return '-';
  }

  return (durationMs / 1000).toFixed(2);
};

function CajaRender({ nombreComponente, query, inicioReferenciaMs }: CajaRenderProps) {
  const estado = obtenerEstado(query);

  return (
    <article className={`renderizados__nodo renderizados__nodo--${estado}`}>
      <h3>{nombreComponente}</h3>
      <p>Inicio en segundo: {segundoInicioRelativo(query.startedAtMs, inicioReferenciaMs)}</p>
      <p>Tiempo de carga: {duracionSegundos(query.durationMs)} s</p>
      <p>Registros cargados: {query.dataLength}</p>
    </article>
  );
}

function Columna({ titulo, descripcion, children }: PropsWithChildren<{ titulo: string; descripcion: string }>) {
  return (
    <section className="renderizados__columna">
      <h2>{titulo}</h2>
      <p className="renderizados__descripcion">{descripcion}</p>
      {children}
    </section>
  );
}

function Unificado({ inicioReferenciaMs, runId }: { inicioReferenciaMs: number; runId: number }) {
  const nacionalidades = useMaestroQuery('nacionalidades', { scope: 'unificado', runId });
  const estadosCiviles = useMaestroQuery('estadosCiviles', { scope: 'unificado', runId });
  const tiposResidencia = useMaestroQuery('tiposResidencia', { scope: 'unificado', runId });

  return (
    <>
      <CajaRender
        nombreComponente="UnificadoMaestroNacionalidades"
        query={nacionalidades}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <CajaRender
        nombreComponente="UnificadoMaestroEstadosCiviles"
        query={estadosCiviles}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <CajaRender
        nombreComponente="UnificadoMaestroTiposResidencia"
        query={tiposResidencia}
        inicioReferenciaMs={inicioReferenciaMs}
      />
    </>
  );
}

function CascadaNivelTres(
  { inicioReferenciaMs, habilitado, runId }: { inicioReferenciaMs: number; habilitado: boolean; runId: number },
) {
  const tiposResidencia = useMaestroQuery('tiposResidencia', {
    scope: 'cascada',
    runId,
    enabled: habilitado,
  });

  return (
    <CajaRender
      nombreComponente="CascadaNivelTres"
      query={tiposResidencia}
      inicioReferenciaMs={inicioReferenciaMs}
    />
  );
}

function CascadaNivelDos(
  { inicioReferenciaMs, habilitado, runId }: { inicioReferenciaMs: number; habilitado: boolean; runId: number },
) {
  const estadosCiviles = useMaestroQuery('estadosCiviles', {
    scope: 'cascada',
    runId,
    enabled: habilitado,
  });

  return (
    <>
      <CajaRender
        nombreComponente="CascadaNivelDos"
        query={estadosCiviles}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <CascadaNivelTres
        inicioReferenciaMs={inicioReferenciaMs}
        habilitado={habilitado && estadosCiviles.isSuccess}
        runId={runId}
      />
    </>
  );
}

function Cascada({ inicioReferenciaMs, runId }: { inicioReferenciaMs: number; runId: number }) {
  const nacionalidades = useMaestroQuery('nacionalidades', {
    scope: 'cascada',
    runId,
    enabled: true,
  });

  return (
    <>
      <CajaRender
        nombreComponente="CascadaNivelUno"
        query={nacionalidades}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <CascadaNivelDos
        inicioReferenciaMs={inicioReferenciaMs}
        habilitado={nacionalidades.isSuccess}
        runId={runId}
      />
    </>
  );
}

type HijoSinCascadaProps = {
  nombreComponente: string;
  query: MaestroQueryResult;
  inicioReferenciaMs: number;
};

function HijoSinCascada({ nombreComponente, query, inicioReferenciaMs }: HijoSinCascadaProps) {
  return (
    <CajaRender
      nombreComponente={nombreComponente}
      query={query}
      inicioReferenciaMs={inicioReferenciaMs}
    />
  );
}

function ComponentesSinCascada({ inicioReferenciaMs, runId }: { inicioReferenciaMs: number; runId: number }) {
  const nacionalidades = useMaestroQuery('nacionalidades', { scope: 'sin-cascada', runId });
  const estadosCiviles = useMaestroQuery('estadosCiviles', { scope: 'sin-cascada', runId });
  const tiposResidencia = useMaestroQuery('tiposResidencia', { scope: 'sin-cascada', runId });

  return (
    <>
      <HijoSinCascada
        nombreComponente="HijoNacionalidades"
        query={nacionalidades}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <HijoSinCascada
        nombreComponente="HijoEstadosCiviles"
        query={estadosCiviles}
        inicioReferenciaMs={inicioReferenciaMs}
      />
      <HijoSinCascada
        nombreComponente="HijoTiposResidencia"
        query={tiposResidencia}
        inicioReferenciaMs={inicioReferenciaMs}
      />
    </>
  );
}

export default function Renderizados() {
  const [runId, setRunId] = useState(0);
  const [inicioActualMs, setInicioActualMs] = useState(inicioReferenciaMs);

  const reiniciar = () => {
    setInicioActualMs(Date.now());
    setRunId((actual) => actual + 1);
  };

  return (
    <main className="renderizados">
      <div className="renderizados__cabecera">
        <h1 className="renderizados__titulo">Renderizados de Maestros con TanStack Query</h1>
        <button className="renderizados__boton" type="button" onClick={reiniciar}>
          Reiniciar simulacion
        </button>
      </div>

      <div className="renderizados__columnas" key={runId}>
        <Columna
          titulo="Unificado"
          descripcion="Los 3 maestros se lanzan desde el mismo nivel al mismo tiempo."
        >
          <Unificado inicioReferenciaMs={inicioActualMs} runId={runId} />
        </Columna>

        <Columna
          titulo="Cascada"
          descripcion="Nivel 1 desbloquea nivel 2, y nivel 2 desbloquea nivel 3 de forma secuencial."
        >
          <Cascada inicioReferenciaMs={inicioActualMs} runId={runId} />
        </Columna>

        <Columna
          titulo="Componentes sin cascada"
          descripcion="El padre hace los fetch y los hijos solo reciben y muestran los datos."
        >
          <ComponentesSinCascada inicioReferenciaMs={inicioActualMs} runId={runId} />
        </Columna>
      </div>
    </main>
  );
}
