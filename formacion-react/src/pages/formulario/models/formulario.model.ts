import { DatosPersonalesForm } from '../components/secciones/datos-personales/datos-personales.model';
import { DocumentoIdentidadForm } from '../components/secciones/documento-identidad/documento-identidad.model';
import { DomicilioId } from '../components/secciones/domicilios/domicilios.model';

export type FormularioSeccionesForm =
  DatosPersonalesForm &
  DocumentoIdentidadForm & {
	domicilios: DomicilioId[];
};
