import { styled } from "styled-components";

const StyledInput = styled.input``;

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};

export default Input;
