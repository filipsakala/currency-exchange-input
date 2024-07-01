import { FormEvent, useCallback, useMemo, useState } from "react";
import ExchangeRate from "../types/ExchangeRate";
import Input from "./Input.styled";
import Select from "./Select.styled";
import { styled } from "styled-components";
import ExchangeResult from "./ExchangeResult";

type Props = {
  rates: ExchangeRate[];
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};
const StyledExchangeRateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ExchangeRateInput = ({
  rates,
  selectedCurrency,
  setSelectedCurrency,
}: Props) => {
  const [amount, setAmount] = useState<number | null>(null);

  const ratesByCurrency = useMemo(() => {
    return rates.reduce(
      (ratesByCurrency: Record<string, ExchangeRate>, rate: ExchangeRate) => {
        ratesByCurrency[rate.code] = rate;
        return ratesByCurrency;
      },
      {}
    );
  }, [rates]);

  const currencies = Object.keys(ratesByCurrency);
  const selectedRate = ratesByCurrency[selectedCurrency];

  const handleAmountChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const inputTarget = event.target as HTMLInputElement;
      setAmount(Number(inputTarget.value) || 0);
    },
    []
  );

  const handleCurrencyChange = useCallback(
    (event: FormEvent<HTMLSelectElement>) => {
      const inputTarget = event.target as HTMLSelectElement;
      setSelectedCurrency(inputTarget.value || "");
    },
    [setSelectedCurrency]
  );

  return (
    <StyledExchangeRateInput>
      <InputWrapper>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.35"
          value={amount || ""}
          onChange={handleAmountChange}
          autoFocus
        />
        CZK to
        <Select
          name="rates"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="">Currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {ratesByCurrency[currency].code} (
              {ratesByCurrency[currency].currency})
            </option>
          ))}
        </Select>
      </InputWrapper>
      <ExchangeResult amount={amount} rate={selectedRate} />
    </StyledExchangeRateInput>
  );
};

export default ExchangeRateInput;
