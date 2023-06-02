import { styled } from "styled-components";
import { THEME } from "./theme";

const StyledSelect = styled.select`
  background-color: ${THEME.select.backgroundColor};
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px 10px;

  color: ${THEME.select.color};
  font-size: ${THEME.select.font.size}px;
  letter-spacing: 0.25rem;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${THEME.select.hover.backgroundColor};
  }

  transition: background-color 100ms ease-in-out;
`;

const Select = (props: React.HTMLProps<HTMLSelectElement>) => {
  return <StyledSelect {...props} />;
};

export default Select;
