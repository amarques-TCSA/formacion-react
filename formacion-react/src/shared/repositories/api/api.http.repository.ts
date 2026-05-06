import { IApiRepository } from "./api.repository";

export const ApiHttpRepository = (): IApiRepository => {
    return {
        obtenerMaestrosBuscador: async (_request) => {
            const response = await fetch('/api/buscador/maestros', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        },
        obtenerResultadosBuscador: async (request) => {
            const response = await fetch('/api/buscador/buscar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            return response.json();
        }
    };
};