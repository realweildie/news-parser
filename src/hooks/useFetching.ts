import { useState } from "react";

export const useFetching = (
  callback: Function
): [Function, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetching = async (...args: any) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
