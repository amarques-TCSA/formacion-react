import { CabeceraListado, ElementoListadoProps, Listado, TiposOrden, TituloPagina } from "@tracasa/tracasa-components";
import { Suspense } from "react";
import { ObtenerMaestrosBuscador, ObtenerResultadosBuscador } from "../buscador.service";
import dayjs from "dayjs";
import { Resultado } from "../models/resultado.model";
import { IApiRepository } from "@/shared/repositories/api";
import { BuscadorForm } from "../models/buscador.schema";


type BuscadorResultadosProps = {
  apiRepository: IApiRepository;
  filtros: BuscadorForm;
}
export default function BuscadorResultados({ apiRepository, filtros }: BuscadorResultadosProps) {
  const { data: maestros } = ObtenerMaestrosBuscador({ apiRepository });
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
      id: 'estado',
      texto: 'Estado',
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



  const queryResultadosBuscador = ObtenerResultadosBuscador({ apiRepository, filtros });
  const resultados = queryResultadosBuscador.data.resultados;

  const elementos = resultados?.map((resultado): ElementoListadoProps<Resultado> => ({
    id: resultado.id,
    nombreCompleto: resultado.nombre + ' ' + resultado.apellido1 + ' ' + resultado.apellido2,
    fechaRegistro: dayjs(resultado.fechaRegistro),
    estado: maestros?.estados.find(e => e.id === resultado.idEstado)?.descripcion || '',
    estadoCivil: maestros?.estadosCiviles.find(ec => ec.id === resultado.idEstadoCivil)?.descripcion || '',
  }));

  return (
    <Suspense>
      <TituloPagina
        title="Buscador"
        id="buscador"
      ></TituloPagina>
      <div>
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
      </div>
    </Suspense>
  );
}
