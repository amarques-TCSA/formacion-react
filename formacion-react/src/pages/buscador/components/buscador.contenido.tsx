import { TituloPagina } from "@tracasa/tracasa-components";
import { Suspense } from "react";
import { IApiRepository } from "@/shared/repositories/api";
import BuscadorDatos from "./buscador.datos";

type BuscadorContenidoProps = {
  apiRepository: IApiRepository;
}

export default function BuscadorContenido({ apiRepository }: BuscadorContenidoProps) {
  return (
    <>
      <TituloPagina
        title="Buscador"
        id="buscador"
      />
      <Suspense>
        <BuscadorDatos apiRepository={apiRepository} />
      </Suspense>
    </>
  );
}
