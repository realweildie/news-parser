import { NewsCard } from "@/components/molecules/NewsCard";
import React from "react";

import cls from "./NewsList.module.scss";

export const NewsList = () => {
  return (
    <div className={cls.NewsList}>
      <NewsCard
        image={"sdfsdf"}
        date={new Date(3434334)}
        apiUrl={"sdfsdf"}
        title={"n.webTitle"}
        key={"n.id"}
      />
    </div>
  );
};
