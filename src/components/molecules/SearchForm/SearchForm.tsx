"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Form from "@/components/atoms/Form";
import Select from "@/components/atoms/Select";

import { useSelector } from "react-redux";
import { selectSearch } from "@/store/searchSlice/selectors";
import { useAppDispatch } from "@/store/store";
import {
  fetchNews,
  setSearchVal,
  setSort,
  setQuantity,
} from "@/store/searchSlice/slice";
import { sortType } from "@/store/searchSlice/types";

type sortUIType = {
  value: sortType;
  label: string;
};

const sorts: sortUIType[] = [
  { value: sortType.RELEVANCE, label: "relevance" },
  { value: sortType.NEWEST, label: "newest" },
  { value: sortType.OLDEST, label: "oldest" },
];

export const SearchForm = () => {
  const [fetching, setFetching] = useState(false);

  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  useEffect(() => {
    (async () => {
      if (fetching) {
        const res = await dispatch(fetchNews(search));
        if (res) {
          setFetching(false);
        }
      }
    })();
  }, [fetching, dispatch]);

  const scrollHandler = useCallback(
    // @ts-ignore
    (e) => {
      const el = e.target.documentElement;

      if (el.scrollHeight - (el.scrollTop + window.innerHeight) < 100) {
        setFetching(true);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  const onSubmitSearchForm = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(fetchNews({ ...search, needToClear: true }));
  };

  const onChangeItem = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchVal(event.target.value));
    },
    [dispatch]
  );

  const onChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSort(event.target.value as sortType));
    },
    [dispatch]
  );

  const onChangeQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuantity(Number(event.target.value)));
    },
    [dispatch]
  );

  return (
    <Form onSubmit={onSubmitSearchForm}>
      <Form.Item>
        <Input
          style={{ width: "100%" }}
          onChange={onChangeItem}
          placeholder={`Type new's title...`}
        />
        <Button>Search</Button>
      </Form.Item>
      <Form.Item>
        <Select onChange={onChangeFilter}>
          {sorts.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>

        <Input
          style={{ width: "150px" }}
          onChange={onChangeQuantity}
          defaultValue={12}
          type="number"
        />
      </Form.Item>
    </Form>
  );
};
