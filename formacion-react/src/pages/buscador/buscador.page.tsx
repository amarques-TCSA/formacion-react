import { CabeceraListado, ElementoListadoProps, FormField, InputDate, LayoutBuscador, LayoutBuscadorFilterSection, Listado, TiposOrden, TituloPagina } from "@tracasa/tracasa-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuscadorForm, schema } from "./models/buscador.schema";
import { Suspense } from "react";
import { Resultado } from "./models/resultado.model";
import { IApiRepository } from "@/shared/repositories/api/api.repository";
import { ObtenerMaestrosBuscador } from "./buscador.service";

type BuscadorPageProps = {
    apiRepository: IApiRepository;
}
export default function BuscadorPage({ 
    apiRepository
    }: BuscadorPageProps) {
    const registro = useForm<BuscadorForm>({
    //resolver: yupResolver(schema),
    defaultValues: {
        fechaDesde: undefined,
        fechaHasta: undefined,
        estado: 'pendiente'
    },
  });

  const maestros = ObtenerMaestrosBuscador({apiRepository});
  console.log(maestros);
  const columnas : CabeceraListado<Resultado>[] = [
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

  const elementos = [] as ElementoListadoProps<Resultado>[];

    return (
        <LayoutBuscador
            title="Página de buscador"
            filtros={
                <>
                    <LayoutBuscadorFilterSection title="Filtros">
                        <FormField
                            error={registro.formState.errors?.fechaDesde}
                            labelText={"Fecha desde"}
                            id="fechaDesde"
                            fullWidth
                            layout="vertical"
                            >
                            <InputDate
                                id="fechaDesde"
                                error={!!registro.formState.errors?.fechaDesde}
                                {...registro.register('fechaDesde')}
                            />
                            </FormField>
                    </LayoutBuscadorFilterSection>
                </>
            } 
            contenido={
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
                        ordenarPor="fechaEnvio"
                        indice={0}
                        tamanoPagina={10}
                    />
                    </div>
                </Suspense>
              
            }
        >     
          
        </LayoutBuscador>
    );
}