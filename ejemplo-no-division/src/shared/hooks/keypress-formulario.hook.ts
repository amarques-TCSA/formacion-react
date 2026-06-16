import { UseFormReturn, SubmitHandler, FieldValues } from 'react-hook-form';

type KeyPressFormularioProps<T extends FieldValues> = {
  registro: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};

export default function useKeyPressFormulario<T extends FieldValues>({
  registro,
  onSubmit,
}: KeyPressFormularioProps<T>) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      document.activeElement &&
      document.activeElement.role === 'combobox' &&
      event.key === 'Enter'
    ) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      registro.handleSubmit(onSubmit)();
    }
  };

  return { handleKeyPress };
}
