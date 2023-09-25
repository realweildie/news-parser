import React, { FC } from "react";
import cls from "./NewsCard.module.scss";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  date: Date;
  image: string;
  apiUrl: string;
}

export const NewsCard: FC<NewsCardProps> = (props) => {
  const { title, date, image, apiUrl } = props;

  const formatedDate = new Date(date).toDateString();

  return (
    <Link href={`/article?id=${apiUrl}`} className={cls.NewsCard}>
      <div className={cls.newsThumb}>
        {/* <Image
          className={cls?.newsImg}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "auto", height: "100%" }}
          alt={title}
          src={image}
        /> */}
      </div>
      <div className={cls.description}>
        <span className={cls.date}>{formatedDate}</span>
        <div>{title}</div>
      </div>
    </Link>
  );
};
