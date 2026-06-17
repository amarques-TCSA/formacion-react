import { useState } from "react";

export function useContar() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador((prev) => prev + 1);
  }

  const decrementar = () => {
    setContador((prev) => prev - 1);
  }

  return {
    contador,
    incrementar,
    decrementar,
  };
}
