import { defaultDatosPersonalesValues } from "../components/secciones/datos-personales/datos-personales.model";
import { defaultDocumentoIdentidadValues } from "../components/secciones/documento-identidad/documento-identidad.model";

export const defaultFormularioValues = {
  ...defaultDatosPersonalesValues,
  ...defaultDocumentoIdentidadValues,
  domicilios: [],
}
