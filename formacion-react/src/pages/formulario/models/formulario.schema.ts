import { datosPersonalesSchema } from '../components/secciones/datos-personales/datos-personales.schema';
import { documentoIdentidadSchema } from '../components/secciones/documento-identidad/documento-identidad.schema';

export const formularioSeccionesSchema = datosPersonalesSchema.concat(documentoIdentidadSchema);
