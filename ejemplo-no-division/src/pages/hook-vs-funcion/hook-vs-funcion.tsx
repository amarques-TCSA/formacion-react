import { Button } from "@tracasa/tracasa-components";
import { useState } from "react";

const sumar = (a: number, b: number) => a + b;

export default function HookVsFuncion() {
  const [contador, setContador] = useState(0);
  const [contador1, setContador2] = useState(0);

  const incrementar = () => {
    setContador((prev) => prev + 1);
  };

  const incrementar2 = () => {
    setContador2((prev) => prev + 1);
  }

  const decrementar = () => {
    setContador((prev) => prev - 1);
  }

  const decrementar2 = () => {
    setContador2((prev) => prev - 1);
  }

  return (
    <div>
      <h1>Hook vs Función</h1>
      <Button onClick={incrementar}>Incrementar</Button>
      <Button onClick={decrementar}>Decrementar</Button>

      <Button onClick={incrementar2}>Incrementar2</Button>
      <Button onClick={decrementar2}>Decrementar2</Button>

      <p>Contador: {contador}</p>
      <p>Contador2: {contador1}</p>
      <p>Sumar: {sumar(contador, contador1)}</p>
    </div>
  );
}
