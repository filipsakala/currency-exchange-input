import logo from "./assets/logo.svg";
import loader from "./assets/loader.svg";
import { styled } from "styled-components";
import useExchangeRates from "./hooks/useExchangeRates";
import ExchangeRates from "./components/ExchangeRates";

const StyledAppWrapper = styled.div`
  display: grid;
  text-align: center;

  background-color: #282c34;
  min-height: 100vh;
  color: white;
`;

const StyledHeader = styled.div`
  padding: 20px;
`;

const StyledLogo = styled.img<{ dataLoaded: boolean }>`
  height: ${({ dataLoaded }) => (dataLoaded ? 10 : 40)}vmin;
  max-width: 100%;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  transition: 1000ms ease-in-out;
`;

const App = () => {
  const { isLoading, error, data } = useExchangeRates();
  const hasData = data && Boolean(data.length);

  return (
    <StyledAppWrapper>
      <StyledHeader>
        <StyledLogo src={logo} alt="logo" dataLoaded={hasData} />
        <h1>Currency Exchange Rate Input</h1>
        {isLoading && <img src={loader} alt="loading" />}
        {error && <p>An error has occurred. Try to refresh the page.</p>}
        {!isLoading && !error && !hasData && (
          <p>Failed to load initial configuration.</p>
        )}
      </StyledHeader>
      {!isLoading && !error && hasData && <ExchangeRates rates={data} />}
    </StyledAppWrapper>
  );
};

export default App;
