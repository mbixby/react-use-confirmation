import { DependencyList, useCallback, useState } from "react";

export const useAsyncCallback = <T extends (...args: never[]) => unknown>(
  callback: T,
  deps: DependencyList
) => {
  const setError = useState()[1];
  return useCallback(() => {
    try {
      callback();
    } catch (error) {
      setError(() => {
        throw error;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
