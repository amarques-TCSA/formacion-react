import { LayoutBuscador } from "@tracasa/tracasa-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuscadorForm, schema } from "./models/buscador.schema";
import { IApiRepository } from "@/shared/repositories/api/api.repository";
import BuscadorFiltros from "./components/buscador.filtros";
import BuscadorResultados from "./components/buscador.resultados";
import { Suspense } from "react";
import { useFiltrosStore } from "./buscador.store";

type BuscadorPageProps = {
  apiRepository: IApiRepository;
}

export default function BuscadorPage({
  apiRepository
}: BuscadorPageProps) {
  const { filtros } = useFiltrosStore();

  const registro = useForm<BuscadorForm>({
    resolver: yupResolver(schema),
    defaultValues: {...filtros},
  });

  return (
    <LayoutBuscador
      title="Página de buscador"
      filtros={<BuscadorFiltros apiRepository={apiRepository} registro={registro} />}
      contenido={<Suspense><BuscadorResultados registro={registro} apiRepository={apiRepository} /></Suspense>}
    />
  );
}
