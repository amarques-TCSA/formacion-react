import * as yup from 'yup';

export type DatosPersonalesForm = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  lugarNacimiento: string;
  nacionalidad: string;
  estadoCivil: string;
  fechaRegistro: string;
  fechaNacimiento: string;
};

export type DocumentoIdentidadForm = {
  tipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicionDocumento: string;
  fechaCaducidadDocumento: string;
  autoridadEmisoraDocumento: string;
};

export type DomicilioForm = {
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  tipoResidencia: string;
};

export type DomicilioId = DomicilioForm & {
  id: number;
  fechaInicio: string;
  actual: boolean;
};

export type DomicilioListado = {
  direccion: string;
  tipoResidencia: string;
  fechaInicio: string;
  actual: string;
};

export type FormularioSeccionesForm = DatosPersonalesForm &
  DocumentoIdentidadForm & {
    domicilios: DomicilioId[];
  };

export const defaultFormularioValues: Omit<FormularioSeccionesForm, 'domicilios'> = {
  nombre: '',
  primerApellido: '',
  segundoApellido: '',
  lugarNacimiento: '',
  estadoCivil: '',
  nacionalidad: '',
  fechaRegistro: '',
  fechaNacimiento: '',
  tipoDocumento: '',
  numeroDocumento: '',
  fechaExpedicionDocumento: '',
  fechaCaducidadDocumento: '',
  autoridadEmisoraDocumento: '',
};

export const defaultDomicilioValues: DomicilioForm = {
  calle: '',
  numero: '',
  codigoPostal: '',
  ciudad: '',
  provincia: '',
  tipoResidencia: '',
};

export const datosPersonalesSchema = yup
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

export const documentoIdentidadSchema = yup
  .object({
    tipoDocumento: yup.string().required(),
    numeroDocumento: yup.string().required(),
    fechaExpedicionDocumento: yup.string().required(),
    fechaCaducidadDocumento: yup.string().required(),
    autoridadEmisoraDocumento: yup.string().required(),
  })
  .required();

export const domiciliosSchema = yup
  .object({
    calle: yup.string().required(),
    numero: yup.string().required(),
    codigoPostal: yup
      .string()
      .required()
      .matches(/^\d{5}$/, 'El codigo postal debe tener 5 numeros'),
    ciudad: yup.string().required(),
    provincia: yup.string().required(),
    tipoResidencia: yup.string().required(),
  })
  .required();

const domicilioItemSchema = domiciliosSchema.shape({
  id: yup.number().required(),
  fechaInicio: yup.string().required(),
  actual: yup.boolean().required(),
});

export const formularioSeccionesSchema = datosPersonalesSchema
  .concat(documentoIdentidadSchema)
  .concat(
    yup.object({
      domicilios: yup.array().of(domicilioItemSchema).required(),
    }),
  );
