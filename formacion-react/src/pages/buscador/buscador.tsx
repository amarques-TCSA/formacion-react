import { ApiHttpRepository } from "@/shared/repositories/api";
import BuscadorPage from "./buscador.page";
import './buscador.css';

const apiRepository = ApiHttpRepository();

export default function Buscador() {
    return (
        <BuscadorPage apiRepository={apiRepository} />
    )
}
