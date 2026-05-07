import * as yup from 'yup';

import { DatosPersonalesForm } from './datos-personales.model';

export const datosPersonalesSchema: yup.ObjectSchema<DatosPersonalesForm> = yup
  .object({
    nombre: yup.string().required(),
    primerApellido: yup.string().required(),
    segundoApellido: yup.string().required(),
    lugarNacimiento: yup.string().required(),
    nacionalidad: yup.string().required(),
    estadoCivil: yup.string().required(),
    fechaRegistro: yup.string().required(),
    fechaNacimiento: yup.string().required(),
  })
  .required();
