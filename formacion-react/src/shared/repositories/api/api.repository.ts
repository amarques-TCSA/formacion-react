import { ObtenerMaestrosBuscadorRequest, ObtenerMaestrosBuscadorResponse } from "./models/buscador";

export type IApiRepository = {
    obtenerMaestrosBuscador(
        request: ObtenerMaestrosBuscadorRequest,
    ): Promise<ObtenerMaestrosBuscadorResponse>;
}