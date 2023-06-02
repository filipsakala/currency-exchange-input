import { styled } from "styled-components";
import { THEME } from "./theme";

const StyledInput = styled.input`
  background-color: ${THEME.input.backgroundColor};
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;

  color: ${THEME.input.color};
  font-size: ${THEME.input.font.size}px;

  &:hover {
    border-color: ${THEME.input.hover.borderColor};
  }

  transition: background-color 100ms ease-in-out;
`;

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return <StyledInput type="text" {...props} />;
};

export default Input;
