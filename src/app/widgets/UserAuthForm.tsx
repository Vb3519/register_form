// Ui:
import CustomInput from '../../shared/ui/CustomInput';
import CustomButton from '../../shared/ui/CustomButton';
import AuthFormInput from '../userAuth/ui/AuthFormInput';

// Patterns:
import {
  userLoginPattern,
  userPasswordPattern,
} from '../userAuth/lib/patterns';

// Model:
import useUserAuthForm from '../userAuth/model/useUserAuthForm';

const UserAuthForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useUserAuthForm();

  return (
    <form
      className="p-4 w-full max-w-lg flex flex-col gap-4 items-center justify-center border-2 border-[#35383f] bg-[#292c31] rounded-md"
      action="#"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* ----- Логин: ----- */}
      <AuthFormInput
        inputName="userLogin"
        labelText="Логин"
        error={errors.userLogin?.message}
      >
        <CustomInput
          {...register('userLogin', {
            required: 'Укажите ваш логин',
            pattern: {
              value: userLoginPattern,
              message:
                'Допустимы только латинские буквы, длина логина от 3 до 15 символов',
            },
          })}
          id="userLogin"
          type="text"
          maxLength={15}
          className="w-full border-1 border-[#35383f] rounded-md text-[#e2e3e7] transition duration-200 ease-in focus:border-gray-400"
          placeholder="Login..."
        />
      </AuthFormInput>

      {/* ----- Пароль: ----- */}
      <AuthFormInput
        inputName="userPassword"
        labelText="Пароль"
        error={errors.userPassword?.message}
      >
        <CustomInput
          {...register('userPassword', {
            required: 'Укажите ваш пароль',
            pattern: {
              value: userPasswordPattern,
              message:
                'Требуется минимум 1 буква, 1 цифра. Минимальная длина 4 символа',
            },
          })}
          id="userPassword"
          type="password"
          maxLength={15}
          className="w-full border-1 border-[#35383f] rounded-md text-[#e2e3e7] transition duration-200 ease-in focus:border-gray-400"
          placeholder="Password..."
        ></CustomInput>
      </AuthFormInput>

      <CustomButton
        className={`text-[#232529] font-semibold transition duration-200 ${
          isSubmitting ? 'bg-gray-400' : 'bg-[#448460] hover:bg-[#55a478]'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Проверка данных' : 'Зарегистрироваться'}
      </CustomButton>
    </form>
  );
};

export default UserAuthForm;
