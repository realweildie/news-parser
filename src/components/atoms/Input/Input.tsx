import { FC } from "react";
import cls from "./Input.module.scss";

export const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input className={cls.Input} {...props} />;
};
