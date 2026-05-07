export type ObtenerMaestrosBuscadorRequest = {

};

export type ObtenerMaestrosBuscadorResponse = {
    estadosSolicitud: [{
        id: number;
        descripcion: string;
    }],
    estadosCiviles: [{
        id: number;
        descripcion: string;
    }],

};

export type ObtenerResultadosBuscadorRequest = {
    filtros: {
        fechaDesde?: string | null;
        fechaHasta?: string | null;
        idEstadoSolicitud?: number | null;
    }
};

export type ObtenerResultadosBuscadorResponse = {
    resultados: ResultadoBuscador[];
};

export type ResultadoBuscador = {
    id: number;
    fechaRegistro: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    idEstadoSolicitud: number;
}
