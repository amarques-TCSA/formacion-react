import { ApiHttpRepository } from "@/shared/repositories/api";
import BuscadorPage from "./buscador.page";
const apiRepository = ApiHttpRepository();

export default function Buscador() {
    return (
        <BuscadorPage apiRepository={apiRepository} />
    )
}
