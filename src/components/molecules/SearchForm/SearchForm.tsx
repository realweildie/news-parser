"use client";
import debounce from "lodash.debounce";

import { useEffect, useState, useCallback, useRef } from "react";
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
import { useFetching } from "@/hooks/useFetching";

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
  const isFirstRender = useRef(true);
  const [textForFetching, setTextForFetching] = useState("");

  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const [fetchNewsFromHook, isLoading, error] = useFetching(
    async (needToClear?: boolean) => {
      const res = await dispatch(fetchNews({ ...search, needToClear }));
      if (res) {
        setFetching(false);
      }
    }
  );

  useEffect(() => {
    fetchNewsFromHook(true);
  }, [search.itemsQuantity, search.searchVal, search.sort]);

  useEffect(() => {
    if (fetching) {
      fetchNewsFromHook();
    }
  }, [fetching]);

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

  const onChangeTextForFetching = useCallback(
    debounce((str: string) => {
      dispatch(setSearchVal(str));
    }, 1500),
    []
  );

  const onChangeItem = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeTextForFetching(event.target.value);
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
    <Form>
      <Form.Item>
        <Input
          style={{ width: "100%" }}
          onChange={onChangeItem}
          placeholder={`Type new's title...`}
        />
      </Form.Item>
      <Form.Item>
        <Select defaultValue={search.sort} onChange={onChangeFilter}>
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
