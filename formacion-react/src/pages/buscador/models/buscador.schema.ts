import { number, object, ObjectSchema, string } from "yup";

export const schema: ObjectSchema<BuscadorForm> = object({
    fechaDesde: string()
    .notRequired()
    .typeError('La fecha desde no puede ser posterior a la fecha hasta')
    .test(
      'fechaHastaMayorQueFechaDesde',
      'La fecha desde no puede ser posterior a la fecha hasta',
      function (value) {
        const { fechaHasta } = this.parent;
        if (fechaHasta && value) {
          return new Date(fechaHasta) >= new Date(value);
        }
        return true;
      },
    ),
  fechaHasta: string()
  .notRequired()
  .test(
    'fechaHastaNoMenorQueFechaDesde',
    '',
    function (value) {
      const { fechaDesde } = this.parent;
      if (fechaDesde && value) {
        return new Date(value) >= new Date(fechaDesde);
      }
      return true;
    },
  ),
  idEstado: number().notRequired(),
})

export type BuscadorForm = {
  fechaDesde?: string | null;
  fechaHasta?: string | null;
  idEstado?: number | null;
}
