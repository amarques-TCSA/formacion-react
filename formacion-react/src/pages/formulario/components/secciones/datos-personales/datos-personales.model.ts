export type DatosPersonalesForm = {
  nombre: string;
  primerApellido: string;
  lugarNacimiento: string;
  nacionalidad: string;
  estadoCivil: string;
  fechaRegistro: string;
  fechaNacimiento: string;
};

export const defaultDatosPersonalesValues: DatosPersonalesForm = {
  nombre: '',
  primerApellido: '',
  lugarNacimiento: '',
  nacionalidad: '',
  estadoCivil: '',
  fechaRegistro: '',
  fechaNacimiento: '',
};
