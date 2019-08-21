import styled, { StyledComponentProps } from "styled-components";
import { Box, BoxProps } from "rebass";

import knightIcon from "./knight.svg";
import React, { FC } from "react";

export interface BoardCellProps {
  boardSize: number;
  isActive: boolean;
}

const BoardCellComponent = styled(Box)<BoardCellProps>`
  position: relative;
  flex: 0 0 calc(${props => `${100 / props.boardSize}%`} - 2px);
  height: 0;
  padding-bottom: ${props => `${70 / props.boardSize}vh`};
  background: ${props =>
    props.isActive ? props.theme.colors.secondary : "white"};
  cursor: pointer;

  && {
    margin: 1px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.muted};
    background-image: url("${knightIcon}");
    background-size: auto 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  & > span {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 2em;
  }
`;

const BoardCell: FC<
  StyledComponentProps<FC<BoxProps>, any, BoardCellProps, never> &
    BoardCellProps
> = ({ boardSize, isActive, children, ...props }) => (
  <BoardCellComponent boardSize={boardSize} isActive={isActive} {...props}>
    <span>{children}</span>
  </BoardCellComponent>
);

export default BoardCell;
