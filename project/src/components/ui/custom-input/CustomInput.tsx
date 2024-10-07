interface ICustomInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function CustomInput({ className, ...props }: ICustomInput): JSX.Element {
  return (
    <input
      className={`${className} p-0.5 px-2 rounded border border-gray-300`}
      {...props}
    />
  );
}

export default CustomInput;
