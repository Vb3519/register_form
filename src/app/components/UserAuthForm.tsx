import { useForm, SubmitHandler } from 'react-hook-form';

// Ui:
import CustomInput from '../../shared/ui/CustomInput';
import CustomButton from '../../shared/ui/CustomButton';

// Types:
import { UserAuthFormFields } from '../../shared/types/auth.interface';

const UserAuthForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserAuthFormFields>();

  return (
    <form
      className="p-4 w-full max-w-lg flex flex-col gap-4 items-center justify-center border-2 border-[#35383f] bg-[#292c31] rounded-md"
      action="#"
      method="post"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted!');
      }}
    >
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="user_name" className="mr-auto text-gray-500">
          Логин
        </label>
        <CustomInput
          id="user_name"
          className="w-full border-1 border-[#35383f] rounded-md text-[#e2e3e7] transition duration-200 ease-in focus:border-gray-400"
          placeholder="Login..."
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="user_password" className="mr-auto text-gray-500">
          Пароль
        </label>

        <CustomInput
          id="user_password"
          className="w-full border-1 border-[#35383f] rounded-md text-[#e2e3e7] transition duration-200 ease-in focus:border-gray-400"
          placeholder="Password..."
        />
      </div>

      <CustomButton className="bg-[#448460] transition duration-200 text-[#232529] font-semibold hover:bg-[#55a478]">
        Зарегистрироваться
      </CustomButton>
    </form>
  );
};

export default UserAuthForm;
