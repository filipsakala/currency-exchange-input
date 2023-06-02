import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ExchangeRate from "../types/ExchangeRate";

type ExchangeRateErrorType = any;
type ReturnType = {
  isLoading: boolean;
  error: ExchangeRateErrorType;
  data: ExchangeRate[];
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useExchangeRates = (): ReturnType => {
  const { isLoading, error, data } = useQuery<
    ExchangeRate[],
    ExchangeRateErrorType
  >({
    queryKey: ["rates"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/exchange-rates`)
        .then((response) => response.json())
        .then((data) => data),
    onError: (err: Object) => err,
  });

  return useMemo(
    () => ({ isLoading, error, data: data || [] }),
    [isLoading, error, data]
  );
};

export default useExchangeRates;
