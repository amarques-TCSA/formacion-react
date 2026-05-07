import { datosPersonalesSchema } from './datos-personales/datos-personales.schema';
import { documentoIdentidadSchema } from './documento-identidad/documento-identidad.schema';

export const formularioSeccionesSchema = datosPersonalesSchema.concat(documentoIdentidadSchema);
