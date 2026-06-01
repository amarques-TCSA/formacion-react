import { FormularioHttpRepository } from "@/shared/repositories/formulario";
import FormularioPage from "./formulario.service";

export default function Formulario() {
  const formularioRepository = FormularioHttpRepository();

  return <>
    <FormularioPage formularioRepository={formularioRepository} />
  </>;
}
