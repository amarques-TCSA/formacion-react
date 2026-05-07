import * as yup from 'yup';

import { DocumentoIdentidadForm } from './documento-identidad.model';

export const documentoIdentidadSchema: yup.ObjectSchema<DocumentoIdentidadForm> = yup
  .object({
    tipoDocumento: yup.string().required(),
    numeroDocumento: yup.string().required(),
    fechaExpedicionDocumento: yup.string().required(),
    fechaCaducidadDocumento: yup.string().required(),
    autoridadEmisoraDocumento: yup.string().required(),
  })
  .required();
