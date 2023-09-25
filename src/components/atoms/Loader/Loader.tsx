import { FC } from "react";
import cls from "./Loader.module.scss";
import { classNames } from "@/utils/classNames";

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className = "" }) => {
  return <div className={classNames(cls.lds_hourglass, {}, [className])}></div>;
};
