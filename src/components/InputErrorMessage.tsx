interface InputErrorMessageProps {
  message: string;
}
function InputErrorMessage({ message }: InputErrorMessageProps) {
  return <div className="text-error">{message}</div>;
}

export default InputErrorMessage;
