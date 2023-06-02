import { styled } from "styled-components";
import ExchangeRate from "../types/ExchangeRate";
import { LOCALE } from "../consts";

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

const StyledRate = styled.div`
  border: 1px solid gray;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
`;

const StyledAmount = styled.div`
  font-size: 20px;
`;

const ExchangeRates = ({ rates }: Props) => {
  return (
    <StyledRates>
      {rates.map(({ code, currency, amount, country, rate }) => (
        <StyledRate key={code} title={currency}>
          <div>
            {amount} {code} ({country})
          </div>
          <StyledAmount>{rate.toLocaleString(LOCALE)} CZK</StyledAmount>
        </StyledRate>
      ))}
    </StyledRates>
  );
};

export default ExchangeRates;
