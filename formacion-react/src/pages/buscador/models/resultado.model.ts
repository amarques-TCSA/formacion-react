import dayjs from 'dayjs';

export type Resultado = {
    id: string;
    fechaRegistro: dayjs.Dayjs;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nombreCompleto: string;    
    estadoCivil: number;
    estado: number;
}