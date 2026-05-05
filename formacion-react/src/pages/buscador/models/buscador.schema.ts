import { object, string } from "yup";

export const schema = object({
    fechaDesde: string()
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
  fechaHasta: string().test(
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
  estado: string().required(),
})

export type BuscadorForm = {
  fechaDesde?: string;
  fechaHasta?: string;
  estado: string;
}