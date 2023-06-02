import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import ExchangeRate from "../types/ExchangeRate";
import Button from "./Button.styled";
import Input from "./Input.styled";
import Select from "./Select.styled";
import { styled } from "styled-components";
import { LOCALE } from "../consts";

type Props = {
  rates: ExchangeRate[];
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledErrorMessage = styled.div`
  color: lightcoral;
  font-size: medium;
  text-align: left;
  padding: 5px 10px;
`;

const StyledResult = styled.div`
  padding: 5px 10px;
  font-size: medium;
`;

const ExchangeRateInput = ({
  rates,
  selectedCurrency,
  setSelectedCurrency,
}: Props) => {
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [exchangeAmount, setExchangeAmount] = useState<number | null>(null);

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
    []
  );

  const handleSubmitExchangeRate = useCallback(() => {
    setIsInvalidInput(false);
    setExchangeAmount(null);

    if (!amount || !selectedCurrency) {
      setIsInvalidInput(true);
      return;
    }

    const rate = ratesByCurrency[selectedCurrency];

    if (!rate) {
      setIsInvalidInput(true);
      return;
    }

    const resultAmount = (amount * rate.amount) / rate.rate;
    setExchangeAmount(resultAmount);
  }, [amount, selectedCurrency, ratesByCurrency]);

  useEffect(() => {
    if (amount && selectedCurrency) {
      handleSubmitExchangeRate();
    } else {
      setExchangeAmount(null);
    }
  }, [amount, selectedCurrency]);

  return (
    <div>
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
        <Button onClick={handleSubmitExchangeRate}>Exchange!</Button>
      </InputWrapper>
      {isInvalidInput && (
        <StyledErrorMessage>
          Type an amount you want to exchange and select a currency.
        </StyledErrorMessage>
      )}
      {exchangeAmount && (
        <StyledResult>
          Great! Now you can exchange {amount} CZK for{" "}
          {exchangeAmount.toLocaleString(LOCALE)}{" "}
          {ratesByCurrency?.[selectedCurrency]?.code}
        </StyledResult>
      )}
    </div>
  );
};

export default ExchangeRateInput;
