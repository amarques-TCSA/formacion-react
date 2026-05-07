type MaestroItem = { id: number; descripcion: string };

export type FormularioMaestros = {
  nacionalidades: MaestroItem[];
  estadosCiviles: MaestroItem[];
  ciudades: MaestroItem[];
  provincias: MaestroItem[];
  tiposResidencia: MaestroItem[];
};

export type OpcionSelector = {
  id: string;
  texto: string;
};

export const mapToOpciones = (items: MaestroItem[]): OpcionSelector[] =>
  items.map(item => ({ id: String(item.id), texto: item.descripcion }));

export const fetchFormularioMaestros = async (): Promise<FormularioMaestros> => {
  const response = await fetch('/api/formulario/maestros');
  if (!response.ok) throw new Error('Error al cargar los maestros');
  return response.json();
};

export const enviarFormulario = async (data: unknown): Promise<{ success: boolean; message: string }> => {
  const response = await fetch('/api/formulario/enviar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al enviar el formulario');
  return response.json();
};
