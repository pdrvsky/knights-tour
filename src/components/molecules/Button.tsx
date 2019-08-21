import React, { FunctionComponent, ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Button } from "rebass/styled-components";
import { ButtonProps } from "rebass";

const StyledButton = styled(Button)`
  border: 0;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  color: white;
  background: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const ButtonComponent: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ children, ...rest }) => (
  <StyledButton {...rest} fontSize={0}>
    {children}
  </StyledButton>
);

export default ButtonComponent;
