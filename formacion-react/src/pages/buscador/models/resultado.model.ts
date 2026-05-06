import dayjs from 'dayjs';

export type Resultado = {
    id: number;
    fechaRegistro: dayjs.Dayjs;
    nombreCompleto: string;    
    estadoCivil: string;
    estado: string;
}