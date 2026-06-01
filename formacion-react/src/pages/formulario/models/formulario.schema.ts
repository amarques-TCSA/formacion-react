import * as yup from 'yup';

import { datosPersonalesSchema } from '../components/secciones/datos-personales/datos-personales.schema';
import { documentoIdentidadSchema } from '../components/secciones/documento-identidad/documento-identidad.schema';
import { domiciliosSchema } from '../components/secciones/domicilios/domicilios.schema';

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
