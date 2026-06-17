import './query-vs-suspense.css';

import { Suspense, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  EstadoCarga,
  estadoDesdeQuery,
  obtenerMaestro,
  queryKeyPeticionDos,
  queryKeyPeticionUno,
} from './query-vs-suspense.service';

type EstadoProps = {
  peticion: string;
  estado: EstadoCarga;
};

function textoEstado(estado: EstadoCarga): string {
  if (estado === 'sin-cargar') {
    return 'sin cargar';
  }

  if (estado === 'cargando') {
    return 'cargando...';
  }

  if (estado === 'cargado') {
    return 'cargado';
  }

  return 'error';
}

function CajaEstado({ peticion, estado }: EstadoProps) {
  return (
    <article className={`query-vs-suspense__estado query-vs-suspense__estado--${estado}`}>
      <p className="query-vs-suspense__etiqueta">{peticion}</p>
      <p className="query-vs-suspense__valor">{textoEstado(estado)}</p>
    </article>
  );
}

function Columna({ titulo, descripcion, children }: React.PropsWithChildren<{ titulo: string; descripcion: string }>) {
  return (
    <section className="query-vs-suspense__columna">
      <h2>{titulo}</h2>
      <p className="query-vs-suspense__descripcion">{descripcion}</p>
      <div className="query-vs-suspense__estado-grid">{children}</div>
    </section>
  );
}

function ColumnaUseQuery({ runId }: { runId: number }) {
  const peticionUno = useQuery({
    queryKey: queryKeyPeticionUno(runId),
    queryFn: () => obtenerMaestro('nacionalidades'),
  });

  const peticionDosHabilitada = peticionUno.isSuccess;

  const peticionDos = useQuery({
    queryKey: queryKeyPeticionDos(runId),
    queryFn: () => obtenerMaestro('estadosCiviles'),
    enabled: peticionDosHabilitada,
  });

  return (
    <>
      <CajaEstado
        peticion="Peticion 1"
        estado={estadoDesdeQuery(peticionUno, true)}
      />
      <CajaEstado
        peticion="Peticion 2"
        estado={estadoDesdeQuery(peticionDos, peticionDosHabilitada)}
      />
    </>
  );
}

function ColumnaUseQueryComoSuspense({ runId }: { runId: number }) {
  const peticionUno = useQuery({
    queryKey: ['query-vs-suspense', 'query-como-suspense', 'peticion-uno', runId],
    queryFn: () => obtenerMaestro('nacionalidades'),
  });

  const peticionDos = useQuery({
    queryKey: ['query-vs-suspense', 'query-como-suspense', 'peticion-dos', runId],
    queryFn: () => obtenerMaestro('estadosCiviles'),
  });

  const ambasCargadas = peticionUno.isSuccess && peticionDos.isSuccess;
  const algunaConError = peticionUno.isError || peticionDos.isError;

  if (algunaConError) {
    return <CajaEstado peticion="Peticion 1 y 2" estado="error" />;
  }

  if (!ambasCargadas) {
    return <CajaEstado peticion="Peticion 1 y 2" estado="cargando" />;
  }

  return <CajaEstado peticion="Peticion 1 y 2" estado="cargado" />;
}

function SuspenseContenidoCargado({ runId }: { runId: number }) {
  useSuspenseQuery({
    queryKey: queryKeyPeticionUno(runId),
    queryFn: () => obtenerMaestro('nacionalidades'),
  });

  useSuspenseQuery({
    queryKey: queryKeyPeticionDos(runId),
    queryFn: () => obtenerMaestro('estadosCiviles'),
  });

  return (
    <>
      <CajaEstado peticion="Peticion 1 y 2" estado="cargado" />
    </>
  );
}

function ColumnaUseSuspense({ runId }: { runId: number }) {
  return (
    <Suspense
      fallback={(
        <>
          <CajaEstado peticion="Peticion 1 y 2" estado="cargando" />
        </>
      )}
    >
      <SuspenseContenidoCargado runId={runId} />
    </Suspense>
  );
}

export default function QueryVsSuspense() {
  const [runId, setRunId] = useState(0);

  return (
    <main className="query-vs-suspense">
      <div className="query-vs-suspense__cabecera">
        <h1 className="query-vs-suspense__titulo">useQuery vs useSuspenseQuery</h1>
        <button
          className="query-vs-suspense__boton"
          type="button"
          onClick={() => setRunId((actual) => actual + 1)}
        >
          Reiniciar simulacion
        </button>
      </div>

      <div className="query-vs-suspense__columnas" key={runId}>
        <Columna
          titulo="useQuery + enabled"
          descripcion="La peticion 2 no empieza hasta que la peticion 1 termina correctamente."
        >
          <ColumnaUseQuery runId={runId} />
        </Columna>

        <Columna
          titulo="useSuspenseQuery"
          descripcion="Un unico Suspense a nivel de columna: hasta completar todo, ambas peticiones aparecen cargando."
        >
          <ColumnaUseSuspense runId={runId} />
        </Columna>

        <Columna
          titulo="useQuery como useSuspense"
          descripcion="Sin Suspense: hasta que no terminan las 2 peticiones, se muestra un unico estado de cargando."
        >
          <ColumnaUseQueryComoSuspense runId={runId} />
        </Columna>
      </div>
    </main>
  );
}
