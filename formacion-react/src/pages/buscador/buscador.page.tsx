import { LayoutBuscador } from "@tracasa/tracasa-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuscadorForm, schema } from "./models/buscador.schema";
import { IApiRepository } from "@/shared/repositories/api/api.repository";
import BuscadorFiltros from "./components/buscador.filtros";
import BuscadorResultados from "./components/buscador.resultados";

type BuscadorPageProps = {
    apiRepository: IApiRepository;
}
export default function BuscadorPage({
    apiRepository
}: BuscadorPageProps) {

    const filtrosPorDefecto: BuscadorForm = {
        fechaDesde: undefined,
        fechaHasta: undefined,
        idEstado: undefined,
    };

    const registro = useForm<BuscadorForm>({
        resolver: yupResolver(schema),
        defaultValues: filtrosPorDefecto,
    });

    return (
        <LayoutBuscador
            title="Página de buscador"
            filtros={<BuscadorFiltros apiRepository={apiRepository} registro={registro} />}
            contenido={<BuscadorResultados filtros={registro.getValues()} apiRepository={apiRepository}/>}
        >
        </LayoutBuscador>
    );
}
