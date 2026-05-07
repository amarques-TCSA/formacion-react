import { TituloPagina } from "@tracasa/tracasa-components";
import { Suspense } from "react";
import { IApiRepository } from "@/shared/repositories/api";
import { BuscadorForm } from "../models/buscador.schema";
import { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";
import BuscadorDatos from "./buscador.datos";

type BuscadorContenidoProps = {
  apiRepository: IApiRepository;
  registro: UseFormReturn<BuscadorForm>;
}

export default function BuscadorContenido({ apiRepository, registro }: BuscadorContenidoProps) {
  return (
    <>
      <TituloPagina
        title="Buscador"
        id="buscador"
      />
      <Suspense>
        <BuscadorDatos apiRepository={apiRepository} registro={registro} />
      </Suspense>
    </>
  );
}
