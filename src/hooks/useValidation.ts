import { UseFormReturn } from 'react-hook-form';

import { validationRules } from '../logics/validationRules';

export const useValidation = (formMethods: UseFormReturn<any>) => {
  const { setError, clearErrors } = formMethods;

  const validateField = (name: string, value: string) => {
    if (!validationRules[name].validate(value)) {
      setError(name, {
        type: 'manual',
        message: validationRules[name].errorMessage,
      });
    } else {
      clearErrors(name);
    }
  };

  return { ...formMethods, validateField };
};
