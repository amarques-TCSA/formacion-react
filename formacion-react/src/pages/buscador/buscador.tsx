import { ApiHttpRepository } from "@/shared/repositories/api";
import BuscadorPage from "./buscador.page";

export default function Buscador() {
    const apiRepository = ApiHttpRepository();

    return (
        <BuscadorPage apiRepository={apiRepository} />
    )
}