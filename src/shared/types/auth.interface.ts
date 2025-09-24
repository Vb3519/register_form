// Форма авторизации:
export interface AuthFormInputProps {
  labelHtmlFor: string;
  labelText: string;
  inputId: string;
  inputPlaceholder: string;
}

// Поля формы авторизации:
export interface UserAuthFormFields {
  userLogin: string;
  userPassword: string;
}
