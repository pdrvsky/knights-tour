import { Position } from "./Position";

export interface KnightsTour {
  visitedPositions: Position[];
  getMove(): Iterable<Position>;
};