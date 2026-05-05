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
        }
    };
};