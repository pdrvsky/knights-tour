import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Flex, Heading, Text } from "rebass/styled-components";

import { Position } from "../../utils/Position";
import { Move } from "../../utils/Move";
import Button from "../molecules/Button";
import BoardCell from "../molecules/BoardCell/BoardCell";
import Input from "../molecules/Input/Input";

export interface BoardProps {
  boardSize: number;
  startingPosition: Position;
  getNextMove: () => IteratorResult<Position>;
  onFieldClick?: (field: Move) => void;
  onSizeChange?: (size: number) => void;
}

export interface BoardFlexProps {
  boardSize: number;
}

const BoardFlex = styled(Flex)<BoardFlexProps>`
  flex-wrap: wrap;
  width: ${props => `${props.boardSize * (70 / props.boardSize)}vh`};
  padding: 1px;
  background: #111;
`;

const Board: FC<BoardProps> = ({
  boardSize,
  startingPosition,
  getNextMove,
  onFieldClick,
  onSizeChange
}) => {
  const [visitedIndexes, setVisitedIndexes] = useState<Array<number>>([]);
  const [inputValue, setInputValue] = useState(0);
  const [isDone, setDone] = useState(false);
  const [autoResolve, setAutoResolve] = useState(0);

  const clearAutoResolve = () => {
    clearInterval(autoResolve);
    setAutoResolve(0);
  };
  const onNextClick = () => {
    const res = getNextMove();
    if (!res.done) {
      return setVisitedIndexes(idx => [
        ...idx,
        res.value.x * boardSize + res.value.y
      ]);
    }

    setDone(true);
  };
  const onAutoResolveClick = () => {
    setAutoResolve(
      setInterval(() => {
        if (!isDone) return onNextClick();
        clearAutoResolve();
      }, 500)
    );
  };
  const onSetSize = () => {
    if (Number.isNaN(Number(inputValue)) || inputValue < 4) return;
    onSizeChange && onSizeChange(inputValue);
  };

  useEffect(() => {
    setVisitedIndexes([startingPosition.x * boardSize + startingPosition.y]);
    setDone(false);
    clearAutoResolve();

    return () => clearAutoResolve();
  }, [boardSize, startingPosition]);

  return (
    <Flex alignItems="flex-start" justifyContent="center" my="2rem" width={1}>
      <BoardFlex boardSize={boardSize} width={3 / 4}>
        {[...Array(Math.pow(boardSize, 2))]
          .map((_, i) => {
            const x = Math.floor(i / boardSize);
            const y = i - x * boardSize;

            return { x, y, idx: visitedIndexes.indexOf(i) };
          })
          .map((pos, i) => (
            <BoardCell
              boardSize={boardSize}
              isActive={pos.idx !== -1}
              key={i}
              onClick={() => {
                if (onFieldClick) onFieldClick(pos);
              }}
            >
              {pos.idx !== -1 && pos.idx}
            </BoardCell>
          ))}
      </BoardFlex>
      <Flex flexDirection="column" mx="1rem" width={1 / 5}>
        <Heading mb={2}>Controls</Heading>
        <Flex mb={2}>
          {isDone && (
            <Text>
              No more moves available. Click on board or resize to begin a new
              tour.
            </Text>
          )}
          {!isDone && autoResolve === 0 && (
            <>
              <Button onClick={() => onNextClick()} mr={2}>
                Next
              </Button>
              <Button mr={2} onClick={() => onAutoResolveClick()}>
                Auto-Resolve
              </Button>
            </>
          )}
        </Flex>
        <Heading mb={2}>Board Size</Heading>
        <Flex flexDirection="column">
          <Flex mb={1}>
            <Input
              type="number"
              placeholder={boardSize.toString()}
              min={4}
              onChange={e => setInputValue(Number(e.target.value))}
            />
            <Button ml={2} onClick={() => onSetSize()}>
              Set Size
            </Button>
          </Flex>
          <Text fontSize={0} color="gray">
            Minimum value of 4. Mind the rendering of larger sizes may be slow.
          </Text>
        </Flex>
        <Heading mt={3} mb={1}>
          Info
        </Heading>
        <Text fontSize={1}>
          Click chess field to set the starting position or to reset the board.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Board;
