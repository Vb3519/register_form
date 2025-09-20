// Ui:
import CustomInput from '../shared/ui/CustomInput';
import CustomButton from '../shared/ui/CustomButton';

const App = () => {
  return (
    <div className="p-4 flex flex-col gap-2 items-center justify-center">
      <CustomInput
        className="w-full max-w-lg border-2 border-blue-300 rounded-md"
        placeholder="Укажите логин..."
      />

      <CustomInput
        className="w-full max-w-lg border-2 border-blue-300 rounded-md"
        placeholder="Укажите пароль..."
      />

      <CustomButton className="bg-blue-500 text-white transition duration-200 hover:bg-blue-600">
        Зарегистрироваться
      </CustomButton>
    </div>
  );
};

export default App;
