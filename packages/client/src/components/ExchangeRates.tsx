import { styled } from "styled-components";
import ExchangeRate from "../types/ExchangeRate";
import { LOCALE } from "../consts";
import ExchangeRateInput from "./ExchangeRateInput";
import { useState } from "react";
import { THEME } from "./theme";

type Props = {
  rates: ExchangeRate[];
};

const StyledRates = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 100%;
  margin: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const StyledRate = styled.div<{ isSelected: boolean }>`
  border: 1px solid gray;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;

  background: ${({ isSelected }) =>
    isSelected ? THEME.select.hover.backgroundColor : "none"};

  cursor: pointer;

  &:hover {
    background: ${THEME.select.hover.backgroundColor};
  }
`;

const StyledAmount = styled.div`
  font-size: 20px;
`;

const ExchangeRates = ({ rates }: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  return (
    <>
      <ExchangeRateInput
        rates={rates}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      <StyledRates>
        {rates.map(({ code, currency, amount, country, rate }) => (
          <StyledRate
            key={code}
            title={currency}
            onClick={() => setSelectedCurrency(code)}
            isSelected={selectedCurrency === code}
          >
            <div>
              {amount} {code} ({country})
            </div>
            <StyledAmount>{rate.toLocaleString(LOCALE)} CZK</StyledAmount>
          </StyledRate>
        ))}
      </StyledRates>
    </>
  );
};

export default ExchangeRates;
