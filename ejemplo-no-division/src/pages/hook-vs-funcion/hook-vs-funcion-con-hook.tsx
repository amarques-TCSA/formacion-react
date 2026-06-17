import { Button } from "@tracasa/tracasa-components";
import { useContar } from "./hooks/use-contar";

const sumar = (a: number, b: number) => a + b;

export default function HookVsFuncion() {
  const { contador, incrementar: incrementar, decrementar: decrementar } = useContar();
  const { contador: contador2, incrementar: incrementar2, decrementar: decrementar2 } = useContar();

  return (
    <div>
      <h1>Hook vs Función</h1>
      <Button onClick={incrementar}>Incrementar</Button>
      <Button onClick={decrementar}>Decrementar</Button>

      <Button onClick={incrementar2}>Incrementar2</Button>
      <Button onClick={decrementar2}>Decrementar2</Button>

      <p>Contador: {contador}</p>
      <p>Contador2: {contador2}</p>
      <p>Sumar: {sumar(contador, contador2)}</p>
    </div>
  );
}
