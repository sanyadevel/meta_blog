import { emailRegex } from '../variables/emailRegex';

interface IValidationRules {
  [key: string]: {
    validate: (value: string) => boolean;
    errorMessage: string;
  };
}

export const validationRules: IValidationRules = {
  userName: {
    validate: (value: string) => value.length >= 3,
    errorMessage: 'Please enter a valid username with at least 3 characters',
  },
  email: {
    validate: (value: string) => emailRegex.test(value),
    errorMessage: 'Please enter a valid email address',
  },
  password: {
    validate: (value: string) => value.length >= 6,
    errorMessage: 'Your password needs to be at least 6 characters.',
  },
  passwordConfirmation:{
    validate: (value: string) => value.length >= 6,
    errorMessage: 'Passwords is not the same',
  },
};
