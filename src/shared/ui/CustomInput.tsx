interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// [ElementName]HTMLAttributes<ElementType>

const CustomInput: React.FC<CustomInputProps> = ({ className, ...props }) => {
  return <input {...props} className={`p-2 outline-none ${className}`}></input>;
};

export default CustomInput;
