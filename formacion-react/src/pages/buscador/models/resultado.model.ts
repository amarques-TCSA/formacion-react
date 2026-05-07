import dayjs from 'dayjs';

export type Resultado = {
    id: number;
    fechaRegistro: dayjs.Dayjs;
    nombreCompleto: string;
    estadoSolicitud: string;
}
