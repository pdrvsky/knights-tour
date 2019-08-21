import { Position } from "./Position";
import { knightsMoves } from "./knightsMoves";
import { KnightsTour } from "./KnightsTour";

export class WarnsdorffRule implements KnightsTour {
  visitedPositions: Position[];

  constructor(private boardSize: number, startingPoint: Position) {
    this.visitedPositions = [startingPoint];
  }

  private getPositionDegree(position: Position): number {
    return this.getPossibleMoves(position).length;
  }
  private getPossibleMoves(position: Position): Position[] {
    return knightsMoves
      .map(m => position.move(m))
      .filter(p => this.isInBoard(p) && this.isPositionEmpty(p));
  }
  private isInBoard(position: Position): boolean {
    const { x, y } = position;
    return x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize;
  }
  private isPositionEmpty(position: Position): boolean {
    return !this.visitedPositions.some(p => position.equals(p));
  }

  public *getMove(): IterableIterator<Position> {
    const latestPosition = this.visitedPositions.reverse()[0];
    const possibleMoves = this.getPossibleMoves(latestPosition);
    const nextMove = possibleMoves
      .map(p => {
        const ret = {
          pos: p,
          degree: this.getPositionDegree(p)
        };
        return ret;
      })
      .sort((a, b) => a.degree - b.degree)[0];

    if (nextMove) {
      this.visitedPositions.push(nextMove.pos);
      yield nextMove.pos;
    }

    return;
  }
}
