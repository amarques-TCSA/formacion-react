import * as yup from 'yup';

export const domiciliosSchema = yup.object({
  calle: yup.string().required(),
  numero: yup.string().required(),
  codigoPostal: yup
    .string()
    .required()
    .matches(/^\d{5}$/, 'El codigo postal debe tener 5 numeros'),
  ciudad: yup.string().required(),
  tipoResidencia: yup.string().required(),
});
