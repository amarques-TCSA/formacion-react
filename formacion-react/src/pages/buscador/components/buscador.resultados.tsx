import { TituloPagina } from "@tracasa/tracasa-components";
import { Suspense } from "react";
import { IApiRepository } from "@/shared/repositories/api";
import { BuscadorForm } from "../models/buscador.schema";
import { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";
import BuscadorDatos from "./buscador.datos";

type BuscadorResultadosProps = {
  apiRepository: IApiRepository;
  registro: UseFormReturn<BuscadorForm>;
}

export default function BuscadorResultados({ apiRepository, registro }: BuscadorResultadosProps) {
  return (
    <>
      <TituloPagina
        title="Buscador"
        id="buscador"
      ></TituloPagina>
      <Suspense>
        <BuscadorDatos apiRepository={apiRepository} registro={registro} />
      </Suspense>
    </>
  );
}
