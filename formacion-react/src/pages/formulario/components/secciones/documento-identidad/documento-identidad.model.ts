export type DocumentoIdentidadForm = {
  tipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicionDocumento: string;
  autoridadEmisoraDocumento: string;
};

export const defaultDocumentoIdentidadValues: DocumentoIdentidadForm = {
  tipoDocumento: '',
  numeroDocumento: '',
  fechaExpedicionDocumento: '',
  autoridadEmisoraDocumento: '',
};
