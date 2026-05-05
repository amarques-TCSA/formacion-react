import { IApiRepository } from "@/shared/repositories/api/api.repository";
import { ObtenerMaestrosBuscadorResponse } from "@/shared/repositories/api/models/buscador";
import { useSuspenseQuery } from "@tanstack/react-query";

export type ObtenerMaestrosBuscadorProps = {
    apiRepository: IApiRepository;
};
export const ObtenerMaestrosBuscador = ({apiRepository}: ObtenerMaestrosBuscadorProps) => {
    return useSuspenseQuery({
        queryKey: ['maestros-buscador'],
        queryFn: async (): Promise<ObtenerMaestrosBuscadorResponse> => {
            return apiRepository.obtenerMaestrosBuscador({});
        }
    });
};