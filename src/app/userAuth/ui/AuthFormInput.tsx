// Types:
import { AuthFormInputProps } from '../../../shared/types/auth.interface';

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  inputName,
  labelText,
  children,
  error,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={inputName} className="mr-auto text-gray-500">
        {labelText}
      </label>

      {children}

      {error && <span className="text-amber-500">{error}</span>}
    </div>
  );
};

export default AuthFormInput;
