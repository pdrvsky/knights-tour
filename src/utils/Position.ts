import { Move } from "./Move";

export class Position {
  constructor(public x: number, public y: number) {}

  equals(position: Position) {
    const { x, y } = position;
    return x === this.x && y === this.y;
  }

  move(move: Move) {
    const { x, y } = move;
    return new Position(this.x + x, this.y + y);
  }
}
