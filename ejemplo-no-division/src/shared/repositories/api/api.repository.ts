import { ObtenerMaestrosBuscadorRequest, ObtenerMaestrosBuscadorResponse, ObtenerResultadosBuscadorRequest, ObtenerResultadosBuscadorResponse } from "./models/buscador";

export type IApiRepository = {
    obtenerMaestrosBuscador(
        request: ObtenerMaestrosBuscadorRequest,
    ): Promise<ObtenerMaestrosBuscadorResponse>;
    obtenerResultadosBuscador(
        request: ObtenerResultadosBuscadorRequest,
    ): Promise<ObtenerResultadosBuscadorResponse>;
    
}