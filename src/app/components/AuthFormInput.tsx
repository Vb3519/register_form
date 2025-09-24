// Ui:
import CustomInput from '../../shared/ui/CustomInput';

// Types:
import { AuthFormInputProps } from '../../shared/types/auth.interface';

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  labelHtmlFor,
  labelText,
  inputId,
  inputPlaceholder,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={labelHtmlFor} className="mr-auto text-gray-500">
        {labelText}
      </label>

      <CustomInput
        id={inputId}
        placeholder={inputPlaceholder}
        className="w-full border-1 border-[#35383f] rounded-md text-[#e2e3e7] transition duration-200 ease-in focus:border-gray-400"
      />
    </div>
  );
};

export default AuthFormInput;
