"use client";

import React from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Form from "@/components/atoms/Form";
import Select from "@/components/atoms/Select";

export const SearchForm = () => {
  const sorts = [
    { value: "relevance", label: "relevance" },
    { value: "newest", label: "newest" },
    { value: "oldest", label: "oldest" },
  ];

  return (
    <Form>
      <Form.Item>
        <Input style={{ width: "100%" }} placeholder={`Type new's title...`} />
        <Button>Search</Button>
      </Form.Item>
      <Form.Item>
        <Select>
          {sorts.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>

        <Input style={{ width: "150px" }} defaultValue={12} type="number" />
      </Form.Item>
    </Form>
  );
};
