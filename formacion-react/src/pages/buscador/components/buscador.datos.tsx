import { AccionListado, CabeceraListado, ElementoListadoProps, Listado, TiposOrden } from "@tracasa/tracasa-components";
import { ObtenerMaestrosBuscador, ObtenerResultadosBuscador } from "../buscador.service";
import { Resultado } from "../models/resultado.model";
import dayjs from "dayjs";
import { IApiRepository } from "@/shared/repositories/api/api.repository";
import { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";
import { BuscadorForm } from "../models/buscador.schema";
import { useBuscadorStore } from "../buscador.store";

type BuscadorDatosProps = {
  apiRepository: IApiRepository;
  registro: UseFormReturn<BuscadorForm>;
};

const columnas: CabeceraListado<Resultado>[] = [
  {
    id: 'nombreCompleto',
    texto: 'Nombre',
    tipo: 'texto',
    tamano: 10,
    alinear: 'izquierda'
  },
  {
    id: 'fechaRegistro',
    texto: 'Fecha de registro',
    tipo: 'fecha',
    tamano: 10,
    alinear: 'centro'
  },
  {
    id: 'estadoSolicitud',
    texto: 'Estado solicitud',
    tipo: 'texto',
    tamano: 10,
    alinear: 'izquierda'
  },
  {
    id: 'estadoCivil',
    texto: 'Estado civil',
    tipo: 'texto',
    tamano: 10,
    alinear: 'izquierda'
  }
];

export default function BuscadorDatos({ apiRepository, registro }: BuscadorDatosProps) {
  const { data: maestros } = ObtenerMaestrosBuscador({ apiRepository });
  const { filtros, setModalAbierta, setDatosModal } = useBuscadorStore();

  const queryResultadosBuscador = ObtenerResultadosBuscador({ apiRepository, filtros});
  const resultados = queryResultadosBuscador.data.resultados;

  const accionAccesoElemento : AccionListado<Resultado> = {
    textoDescriptivo: 'Acceso al elemento',
    accion: (resultado) => {
      setDatosModal(resultado);
      setModalAbierta(true);
    }
  }

  const elementos = resultados?.map((resultado): ElementoListadoProps<Resultado> => ({
    id: resultado.id,
    nombreCompleto: resultado.nombre + ' ' + resultado.apellido1 + ' ' + resultado.apellido2,
    fechaRegistro: dayjs(resultado.fechaRegistro),
    estadoSolicitud: maestros?.estadosSolicitud.find(e => e.id === resultado.idEstadoSolicitud)?.descripcion || '',
    estadoCivil: maestros?.estadosCiviles.find(ec => ec.id === resultado.idEstadoCivil)?.descripcion || '',
    accionPrincipal: accionAccesoElemento,
    acciones: [accionAccesoElemento],
  }));

  return (
    <Listado
      mostrarFiltrar
      columnas={columnas}
      idIdioma={0}
      items={elementos}
      tipoOrden={TiposOrden.Descendente}
      ordenarPor="fechaRegistro"
      indice={0}
      tamanoPagina={5}
    />
  )
}
