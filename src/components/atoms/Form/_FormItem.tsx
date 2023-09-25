import React, { FC, ReactNode } from "react";
import cls from "./Form.module.scss";

interface FormItemProps {
  children: ReactNode;
}

export const FormItem: FC<FormItemProps> = ({ children }) => {
  return <div className={cls.FormItem}>{children}</div>;
};
