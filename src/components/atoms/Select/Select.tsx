import React, { FC, ReactNode } from "react";

import cls from "./Select.module.scss";

type SelectProps<E extends React.ElementType> = {
  children: ReactNode;
  as?: E;
};

type ComponentProps<E extends React.ElementType> = SelectProps<E> &
  Omit<React.ComponentProps<E>, keyof SelectProps<E>>;

export const Select = <E extends React.ElementType = "select">(
  props: ComponentProps<E>
) => {
  const { children, as: Component = "select", ...otherProps } = props;

  return (
    <Component className={cls.Select} {...otherProps}>
      {children}
    </Component>
  );
};

export const Option: React.FC<
  React.PropsWithChildren<
    React.HTMLProps<HTMLOptionElement> & { value: string }
  >
> = (props) => <option {...props} />;
