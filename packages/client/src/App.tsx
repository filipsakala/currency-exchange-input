import { useQuery } from "@tanstack/react-query";
import logo from "./assets/logo.svg";
import { styled } from "styled-components";

const StyledAppWrapper = styled.div`
  text-align: center;
`;

const StyledHeader = styled.header`
  background-color: #282c34;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledLogo = styled.img`
  height: 40vmin;
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
`;

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["rates"],
    queryFn: () =>
      fetch(
        "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
        { mode: "no-cors" }
      ).then(() => "Hello World 😇"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred:</div>;
  }

  return (
    <StyledAppWrapper>
      <StyledHeader>
        <StyledLogo src={logo} alt="logo" />
        <h1>Currency Exchange Rate Input</h1>
        {error ? <p>Error</p> : null}
        <p>{data}</p>
      </StyledHeader>
    </StyledAppWrapper>
  );
};

export default App;
