import { NewsCard } from "@/components/molecules/NewsCard";
import { Loader } from "@/components/atoms/Loader/Loader";
import { useSelector } from "react-redux";
import { selectNews } from "@/store/newsSlice/selectors";
import { selectSearch } from "@/store/searchSlice/selectors";

import { statusType } from "@/store/searchSlice/types";

import cls from "./NewsList.module.scss";

export const NewsList = () => {
  const { status } = useSelector(selectSearch);
  const { news } = useSelector(selectNews);

  return (
    <>
      <div className={cls.NewsList}>
        {news.map((n) => (
          <NewsCard
            image={n.fields?.thumbnail}
            date={n.webPublicationDate}
            apiUrl={n.apiUrl}
            title={n.webTitle}
            key={n.id}
          />
        ))}
      </div>
      {status === statusType.LOADING && (
        <div className={cls.center}>
          <Loader />
        </div>
      )}
    </>
  );
};
