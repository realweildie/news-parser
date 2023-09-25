import { FC, ReactNode } from "react";
import cls from "./Form.module.scss";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form: FC<FormProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <form className={cls.Form} {...otherProps}>
      {children}
    </form>
  );
};
