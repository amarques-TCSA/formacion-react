import { t } from 'i18next';

import { OpcionSelector } from './sections/domicilios/domicilios.model';

const ciudadesMock: OpcionSelector[] = [
  { id: 'sarriguren', texto: 'Sarriguren' },
  { id: 'pamplona', texto: 'Pamplona' },
  { id: 'tudela', texto: 'Tudela' },
  { id: 'estella', texto: 'Estella' },
];

const provinciasMock: OpcionSelector[] = [
  { id: 'navarra', texto: 'Navarra' },
  { id: 'guipuzcoa', texto: 'Gipuzkoa' },
  { id: 'bizkaia', texto: 'Bizkaia' },
  { id: 'araba', texto: 'Araba' },
];

export const obtenerCiudades = async (): Promise<OpcionSelector[]> => {
  return Promise.resolve(ciudadesMock);
};

export const obtenerProvincias = async (): Promise<OpcionSelector[]> => {
  return Promise.resolve(provinciasMock);
};

export const obtenerTiposResidencia = (): OpcionSelector[] => {
  return [
    { id: 'propia', texto: t('formulario.modal.opcionPropia') },
    { id: 'alquiler', texto: t('formulario.modal.opcionAlquiler') },
    { id: 'cedida', texto: t('formulario.modal.opcionCedida') },
  ];
};
