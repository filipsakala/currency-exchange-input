import { styled } from "styled-components";

const StyledSelect = styled.select``;

const Select = (props: React.HTMLProps<HTMLSelectElement>) => {
  return <StyledSelect {...props} />;
};

export default Select;
