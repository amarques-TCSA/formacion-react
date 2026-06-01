import { FormularioHttpRepository } from "@/shared/repositories/formulario";
import FormularioPage from "./formulario.page";

export default function Formulario() {
  const formularioRepository = FormularioHttpRepository();

  return <>
    <FormularioPage formularioRepository={formularioRepository} />
  </>;
}
