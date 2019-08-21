import { Move } from "../utils/Move";
import { WarnsdorffRule } from "../utils/WarnsdorffRule";
import { Position } from "../utils/Position";

export const useWarnsdorffRule = (boardSize: number, startingPosition: Move) => {
  const { x, y } = startingPosition;
  return new WarnsdorffRule(boardSize, new Position(x, y));
};
