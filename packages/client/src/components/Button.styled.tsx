import { styled } from "styled-components";

const StyledButton = styled.button``;

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};

export default Button;
