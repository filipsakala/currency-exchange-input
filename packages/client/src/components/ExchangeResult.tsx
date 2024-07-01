import styled from "styled-components";
import { LOCALE } from "../consts";
import ExchangeRate from "../types/ExchangeRate";

type Props = {
  amount: number | null;
  rate?: ExchangeRate;
};

const StyledAmount = styled.span`
  font-size: x-large;
  color: #00ff1d;
`;

const ExchangeResult = ({ amount, rate }: Props) => {
  if (!amount || !rate) {
    return null;
  }

  const exchangeAmount = (amount * rate.amount) / rate.rate;
  const exchangeCurrency = rate.code;

  return (
    <div>
      <div>Great! Now you can exchange</div>
      <div style={{ paddingTop: 10 }}>
        <StyledAmount>{amount} CZK</StyledAmount> for{" "}
        <StyledAmount>
          {exchangeAmount.toLocaleString(LOCALE)} {exchangeCurrency}
        </StyledAmount>
      </div>
    </div>
  );
};

export default ExchangeResult;
