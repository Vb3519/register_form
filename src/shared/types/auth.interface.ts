// Поля формы авторизации:
export interface UserAuthFormFields {
  userLogin: string;
  userPassword: string;
}

// Форма авторизации:
export interface AuthFormInputProps {
  inputName: keyof UserAuthFormFields;
  labelText: string;
  children: React.ReactNode;
  error?: string | undefined;
}
