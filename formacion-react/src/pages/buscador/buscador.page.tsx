import { Button, IconWrapper, LayoutBuscador } from "@tracasa/tracasa-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuscadorForm, schema } from "./models/buscador.schema";
import { IApiRepository } from "@/shared/repositories/api/api.repository";
import BuscadorFiltros from "./components/buscador.filtros";
import BuscadorContenido from "./components/buscador.contenido";
import { Suspense } from "react";
import { useBuscadorStore } from "./buscador.store";
import BuscadorDetalleModal from "./components/buscador.detalle-modal";

type BuscadorPageProps = {
  apiRepository: IApiRepository;
}

export default function BuscadorPage({
  apiRepository
}: BuscadorPageProps) {
  const { filtros } = useBuscadorStore();

  const registro = useForm<BuscadorForm>({
    resolver: yupResolver(schema),
    defaultValues: { ...filtros },
  });

  const imprimirFn = () => {
    window.print();
  }

  const botonImprimir = (
    <Button
      variant="principal"
      onClick={imprimirFn}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconWrapper icono="printer" />
        Imprimir
      </span>
    </Button>
  );

  return (
    <>
      <LayoutBuscador
        title="Página de buscador"
        filtros={<BuscadorFiltros apiRepository={apiRepository} registro={registro} />}
        contenido={<Suspense><BuscadorContenido registro={registro} apiRepository={apiRepository} /></Suspense>}
        childrenBarraHerramientas={botonImprimir}
      />
      <BuscadorDetalleModal />
    </>
  );
}
