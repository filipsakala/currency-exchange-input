import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ExchangeRate from "../types/ExchangeRate";
import parseExchangeRates from "../utils/parseExchangeRates";

type ExchangeRateErrorType = any;
type ReturnType = {
  isLoading: boolean;
  error: ExchangeRateErrorType;
  data: ExchangeRate[];
};

const useExchangeRates = (): ReturnType => {
  const { isLoading, error, data } = useQuery<string, ExchangeRateErrorType>({
    queryKey: ["rates"],
    queryFn: () =>
      fetch(
        "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
        { mode: "no-cors" }
      ).then(() => "Hello World 😇"),
    onError: (err: Object) => err,
  });

  return useMemo(
    () => ({ isLoading, error, data: parseExchangeRates(data) }),
    [isLoading, error, data]
  );
};

export default useExchangeRates;
