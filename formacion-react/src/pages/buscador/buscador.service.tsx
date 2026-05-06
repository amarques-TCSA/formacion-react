import { IApiRepository } from "@/shared/repositories/api/api.repository";
import { ObtenerMaestrosBuscadorResponse, ObtenerResultadosBuscadorResponse } from "@/shared/repositories/api/models/buscador";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BuscadorForm } from "./models/buscador.schema";

export type ObtenerMaestrosBuscadorProps = {
    apiRepository: IApiRepository;
};
export const ObtenerMaestrosBuscador = ({apiRepository}: ObtenerMaestrosBuscadorProps) => {
    return useSuspenseQuery({
        queryKey: ['buscador', 'maestros'],
        queryFn: async (): Promise<ObtenerMaestrosBuscadorResponse> => {
            return apiRepository.obtenerMaestrosBuscador({});
        }
    });
};

export type ObtenerResultadosBuscadorProps = {
    apiRepository: IApiRepository;
    filtros: BuscadorForm;
};
export const ObtenerResultadosBuscador = (
    {apiRepository, filtros }: ObtenerResultadosBuscadorProps
    ) => {
    return useSuspenseQuery({
        queryKey: ['buscador', 'resultados'],
        queryFn: async (): Promise<ObtenerResultadosBuscadorResponse> => {
            return apiRepository.obtenerResultadosBuscador({
                filtros : { ...filtros }
            });
        }
    });
};
