import { Button, Form, FormField, InputDate, LayoutBuscadorFilterSection, RowLayout, Selector } from "@tracasa/tracasa-components";
import { Controller, UseFormReturn } from "react-hook-form";
import { BuscadorForm } from "./models/buscador.schema";
import { useQueryClient } from "@tanstack/react-query";
import { ObtenerMaestrosBuscador } from "./buscador.service";

type BuscadorFiltrosProps = {
  maestros: ReturnType<typeof ObtenerMaestrosBuscador>['data'];
  registro: UseFormReturn<BuscadorForm>;
  isLoading: boolean;
}

export default function BuscadorFiltros({ maestros, registro, isLoading }: BuscadorFiltrosProps) {
  const queryClient = useQueryClient();

  const onSubmit = () => {
    queryClient.removeQueries({ queryKey: ['buscador', 'resultados'] });
    queryClient.invalidateQueries({
     queryKey: ['buscador', 'resultados'],
   });
  };

  const { handleKeyPress } = useKeyPressFormulario<BuscadorForm>({
    registro,
    onSubmit,
  });


  return (
    <Form
      registro={registro}
      onSubmit={onSubmit}
      data-testid="buscador-filtros"
      onKeyDown={handleKeyPress}
    >
      <LayoutBuscadorFilterSection title="Fecha registro">
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
        <FormField
          error={registro.formState.errors?.fechaHasta}
          labelText={"Fecha hasta"}
          id="fechaHasta"
          fullWidth
          layout="vertical"
        >
          <InputDate
            id="fechaHasta"
            error={!!registro.formState.errors?.fechaHasta}
            {...registro.register('fechaHasta')}
          />
        </FormField>
      </LayoutBuscadorFilterSection>
      <LayoutBuscadorFilterSection
        title="Estado"
      >
        <FormField
          id="idEstadoSolicitud"
          labelText="Estado solicitud"
          layout="vertical"
          fullWidth
        >
          <Controller
            control={registro.control}
            name="idEstadoSolicitud"
            render={({ field }) => (
              <Selector
                permitirBusqueda
                mostrarX={true}
                id="idEstadoSolicitud"
                opciones={maestros.estadosSolicitud.map((x) => ({
                  id: x.id.toString(),
                  texto: x.descripcion,
                }))}
                idSeleccionado={field.value?.toString() ?? null}
                onChange={field.onChange}
                error={!!registro.formState.errors.idEstadoSolicitud}
              />
            )}
          />
        </FormField>
      </LayoutBuscadorFilterSection>

      <RowLayout
        space={1}
        justifyContent="space-between"
      >
        <Button
          variant="secundario"
          type="button"
          onClick={() => registro.reset()}
          disabled={isLoading}
        >
          Limpiar filtros
        </Button>
        <Button variant="principal" type="submit" disabled={isLoading}>
          Buscar
        </Button>
      </RowLayout>
    </Form>
  );
}
function useKeyPressFormulario<T>(arg0: { registro: UseFormReturn<BuscadorForm>; onSubmit: () => void; }): { handleKeyPress: any; } {
  throw new Error("Function not implemented.");
}

