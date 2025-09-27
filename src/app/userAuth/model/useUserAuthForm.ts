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
      console.log('Form submitted!', formData);

      reset();
    } catch (error: unknown) {
      setError('root', { message: 'Что-то полшло не так...' });
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
