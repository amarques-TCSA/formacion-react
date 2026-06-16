import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const anadirSemanas = (fecha: Date, weeks: number) => {
  return dayjs(fecha).add(weeks, 'week').toDate();
};

export const contarFiltrosAplicados = (
  valores: object,
  clavesIgnoradas: string[] | undefined = [],
) =>
  Object.entries(valores).filter(
    ([clave, valor]) => !clavesIgnoradas.includes(clave) && tieneValor(valor),
  ).length;

export const tieneValor = (valor: unknown): boolean => {
  if (valor === null || valor === undefined) return false;
  if (typeof valor === 'string') return valor.trim() !== '';
  if (typeof valor === 'number' || typeof valor === 'boolean') return true;
  if (Array.isArray(valor)) {
    return valor.some((v) => tieneValor(v));
  }
  if (typeof valor === 'object') {
    const entries = Object.values(valor as Record<string, unknown>);
    return entries.length > 0 && entries.some((x) => tieneValor(x));
  }
  return false;
};

export const alMenosUnFiltroTieneValor = (
  objeto: object,
  clavesIgnoradas: string[] | undefined = [],
) => {
  return Object.entries(objeto).some(
    ([clave, valor]) => !clavesIgnoradas.includes(clave) && tieneValor(valor),
  );
};

export function ordenarPorFecha<T>(
  campo: keyof T,
  descendente: boolean = true,
): (a: T, b: T) => number {
  return (a, b) => {
    const aFecha = dayjs(a[campo] as string | Date).valueOf();
    const bFecha = dayjs(b[campo] as string | Date).valueOf();
    return descendente ? bFecha - aFecha : aFecha - bFecha;
  };
}

export function ordenarPorString<T>(
  campo: keyof T,
  descendente: boolean = false,
): (a: T, b: T) => number {
  return (a, b) => {
    const aStr = String(a[campo] ?? '');
    const bStr = String(b[campo] ?? '');
    const comparacion = aStr.localeCompare(bStr);
    return descendente ? -comparacion : comparacion;
  };
}

const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filtrarPorColumnas =
  <T extends object>(columnas: (keyof T)[], valor: string) =>
  (x: T) => {
    const filtro = normalizar(valor);
    return columnas.some((col) =>
      normalizar(String(x[col] ?? '').toLowerCase()).includes(
        normalizar(filtro.toLowerCase()),
      ),
    );
  };

export const valorContiene = (texto: string, filtro: string): boolean => {
  return normalizar(texto.toLowerCase()).includes(
    normalizar(filtro.toLowerCase()),
  );
};

export const formatearFecha = (fecha: string, formato: string) => {
  return dayjs(fecha).format(formato);
};

export const formatearFechaDate = (fecha: Date, formato: string) => {
  return dayjs(fecha).format(formato);
};

export const formatearFechaUndefinedBackend = (fecha?: Date) => {
  return dayjs(fecha ?? new Date()).format('YYYY-MM-DD HH:mm:ss');
};
