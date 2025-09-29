import { useForm, SubmitHandler } from 'react-hook-form';

// Types:
import { UserAuthFormFields } from '../../../shared/types/auth.interface';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';

const useUserAuthForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserAuthFormFields>();

  const onSubmit: SubmitHandler<UserAuthFormFields> = async (formData) => {
    try {
      await serverResponseImitation(2000);

      const authResponse: Response = await fetch(
        'http://localhost:4000/users',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (authResponse.ok) {
        const authResult = await authResponse.json();

        console.log('Form submitted!', authResult);

        reset();
      } else {
        const errorMsg = `HTTP error: ${authResponse.status} ${authResponse.statusText}`;
        console.log(errorMsg);
      }
    } catch (error: unknown) {
      setError('root', { message: 'Что-то пошло не так...' });
    }
  };

  //   return {
  //     register: register,
  //     handleSubmit: handleSubmit,
  //     ...
  //   };

  return {
    register,
    handleSubmit,
    onSubmit,
    setError,
    reset,
    errors,
    isSubmitting,
  };
};

export default useUserAuthForm;
