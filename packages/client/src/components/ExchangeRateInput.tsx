import { useCallback, useMemo, useState } from "react";
import ExchangeRate from "../types/ExchangeRate";
import Button from "./Button.styled";
import Input from "./Input.styled";
import Select from "./Select.styled";

type Props = {
  rates: ExchangeRate[];
};

const ExchangeRateInput = ({ rates }: Props) => {
  return (
    <div>
      <div>
        <Input />
        <Select name="rates" />
        <Button />
      </div>
      <div>Result...</div>
    </div>
  );
};

export default ExchangeRateInput;
