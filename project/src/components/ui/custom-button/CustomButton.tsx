interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonText?: string;
}

function CustomButton({
  className,
  buttonText,
  ...props
}: ICustomButton): JSX.Element {
  return (
    <button
      className={`${className} text-white p-1 px-2 rounded text-sm`}
      {...props}
    >
      {buttonText && buttonText}
      {props.children}
    </button>
  );
}

export default CustomButton;
