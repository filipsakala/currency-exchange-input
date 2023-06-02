import { styled } from "styled-components";
import { THEME } from "./theme";

const StyledButton = styled.button`
  background-color: ${THEME.button.backgroundColor};
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px 15px;

  color: ${THEME.button.color};
  font-size: ${THEME.button.font.size}px;
  letter-spacing: 0.25rem;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${THEME.button.hover.backgroundColor};
  }

  transition: background-color 100ms ease-in-out;
`;

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};

export default Button;
