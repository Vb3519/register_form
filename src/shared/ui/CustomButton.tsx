interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={`${className} p-2 rounded-sm cursor-pointer`}>
      {children}
    </button>
  );
};

export default CustomButton;
