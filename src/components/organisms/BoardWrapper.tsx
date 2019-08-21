import React, { FunctionComponent, useState } from "react";
import { Text } from "rebass/styled-components";

import { useWarnsdorffRule } from "../../hooks/useKnightsTour";
import { Move } from "../../utils/Move";

import Board from "./Board";

const DEFAULT_SIZE = 8;
const DEFAULT_POSITION = {x: 0, y: 0};

const BoardWrapper: FunctionComponent = () => {
  const [startingPoint, setStartingPoint] = useState<Move>(DEFAULT_POSITION);
  const [boardSize, setBoardSize] = useState(DEFAULT_SIZE);
  const knightsTour = useWarnsdorffRule(boardSize, startingPoint);

  return (
    <>
      <Text>Board size: {`${boardSize}x${boardSize}`}</Text>
      <Board
        boardSize={boardSize}
        startingPosition={knightsTour.visitedPositions[0]}
        getNextMove={() => knightsTour.getMove().next()}
        onFieldClick={field => setStartingPoint(field)}
        onSizeChange={size => setBoardSize(size)}
      />
    </>
  );
};

export default BoardWrapper;
