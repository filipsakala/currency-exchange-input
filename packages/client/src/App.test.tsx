import { render, screen } from "@testing-library/react";
import App from "./App";
import useExchangeRates from "./hooks/useExchangeRates";

jest.mock("./hooks/useExchangeRates");

const mockUseExchangeRates = jest.mocked(useExchangeRates);

it("displays the header", () => {
  mockUseExchangeRates.mockReturnValue({
    isLoading: false,
    error: undefined,
    data: [],
  });

  render(<App />);

  const header = screen.getByText("Currency Exchange Rate Input");
  const noDataMessage = screen.getByText(
    "Failed to load initial configuration."
  );

  expect(header).toBeDefined();
  expect(noDataMessage).toBeDefined();
});

it("displays loading and error messages", () => {
  mockUseExchangeRates.mockReturnValue({
    isLoading: true,
    error: "Some error...",
    data: [],
  });

  render(<App />);

  const loading = screen.getByAltText("loading");
  const error = screen.getByText(
    "An error has occurred. Try to refresh the page."
  );

  expect(loading).toBeDefined();
  expect(error).toBeDefined();
});

it("displays rates", () => {
  mockUseExchangeRates.mockReturnValue({
    isLoading: false,
    error: undefined,
    data: [
      {
        country: "Canada",
        currency: "dollar",
        amount: 1,
        code: "CAD",
        rate: 17.065,
      },
      {
        country: "Switzerland",
        currency: "franc",
        amount: 1,
        code: "CHF",
        rate: 25.976,
      },
    ],
  });

  render(<App />);

  const loading = screen.queryByAltText("loading");
  const currency1 = screen.getByText("1 CAD (Canada)");
  const currency2 = screen.getByText("1 CHF (Switzerland)");

  expect(loading).not.toBeInTheDocument();
  expect(currency1).toBeDefined();
  expect(currency2).toBeDefined();
  expect(mockUseExchangeRates).toBeCalledTimes(1);
});
