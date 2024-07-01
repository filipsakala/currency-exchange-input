import { LOCALE } from "../consts";
import ExchangeRate from "../types/ExchangeRate";

type Props = {
  amount: number | null;
  rate?: ExchangeRate;
};

const ExchangeResult = ({ amount, rate }: Props) => {
  if (!amount || !rate) {
    return null;
  }

  const exchangeAmount = (amount * rate.amount) / rate.rate;
  const exchangeCurrency = rate.code;

  return (
    <div>
      Great! Now you can exchange {amount} CZK for{" "}
      {exchangeAmount.toLocaleString(LOCALE)} {exchangeCurrency}
    </div>
  );
};

export default ExchangeResult;
