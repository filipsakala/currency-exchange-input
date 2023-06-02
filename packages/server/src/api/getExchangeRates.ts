// import fetch from "node-fetch";

import ExchangeRate from "../types/ExchangeRate";
import { ParseError } from "../types/errors";

const EXCHANGE_RATES_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

const parseExchangeRates = (textRates?: string): ExchangeRate[] => {
  if (!textRates) {
    return [];
  }

  return textRates
    .split("\n")
    .reduce((rates: ExchangeRate[], parsedRow, index) => {
      // skip date and column definition, empty lines
      if (index <= 1 || !parsedRow) {
        return rates;
      }

      // Line format: Country|Currency|Amount|Code|Rate
      const rateData = parsedRow.split("|");

      if (rateData.length && rateData.length != 5) {
        throw new ParseError(
          `wrong number of columns on line ${index}: ${parsedRow}`
        );
      }

      rates.push({
        country: rateData[0],
        currency: rateData[1],
        amount: Number(rateData[2]),
        code: rateData[3],
        rate: Number(rateData[4]),
      });

      return rates;
    }, [])
    .sort((a: ExchangeRate, b: ExchangeRate) => a.code.localeCompare(b.code));
};

const getExchangeRates = (): Promise<ExchangeRate[]> => {
  return fetch(EXCHANGE_RATES_URL)
    .then((response) => response.text())
    .then((textRates) => parseExchangeRates(textRates));
};

export default getExchangeRates;
