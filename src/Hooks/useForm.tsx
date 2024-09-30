import { ChangeEvent, useState } from 'react';

export const useForm = <T extends object>(
  initState: T,
  validate?: (form: T) => Partial<T>
) => {
  const [form, setForm] = useState(initState);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (onSubmit: () => void) => {
    if (validate) {
      const validationErrors = validate(form);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        onSubmit();
      }
    } else {
      onSubmit();
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};
