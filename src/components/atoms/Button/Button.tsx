"use client";

import { FC } from "react";
import cls from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <button className={cls.Button} {...otherProps}>
      {children}
    </button>
  );
};
