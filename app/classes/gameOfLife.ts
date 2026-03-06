/**
 * Conway's Game of Life logic
 */

export class GameOfLife {
  private width: number;
  private height: number;
  private grid: boolean[][];
  private generation: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.generation = 0;
    this.grid = this.createGrid(false);
  }

  /**
   * Get the current grid state
   */
  getGrid(): boolean[][] {
    return this.grid;
  }


  /**
   * Get the game's current width
   */
  getWidth(): number {
    return this.width;
  }

/**
   * Get the game's current height
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * Set the game's current width
   */
  setWidth(newWidth: number) {
    this.width = newWidth;
  }

/**
   * Set the game's current height
   */
  setHeight(newHeight: number) {
    this.height = newHeight;
  }

  /**
   * Create a new grid with initial state
   */
  private createGrid(alive: boolean): boolean[][] {
    return Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill(alive));
  }

  /**
   * Get the generation count
   */
  getGeneration(): number {
    return this.generation;
  }

  /**
   * Count alive neighbors for a cell
   */
  private countAliveNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;

        // edges wrap around, ex. -1 is converted to 79 if grid = 80 x 80
        const nx = (x + dx + this.width) % this.width;
        const ny = (y + dy + this.height) % this.height;
        if (this.grid[ny][nx]) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * Advance to the next generation
   */
  step(): void {
    const newGrid = this.createGrid(false);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const aliveNeighbors = this.countAliveNeighbors(x, y);
        const isAlive = this.grid[y][x];

        // Apply Conway's Game of Life rules
        if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
          // Cell survives with 2 or 3 neighbors
          newGrid[y][x] = true;
        } else if (!isAlive && aliveNeighbors === 3) {
          // Cell is born with exactly 3 neighbors
          newGrid[y][x] = true;
        }
        // Otherwise cell dies or stays dead
      }
    }

    this.grid = newGrid;
    this.generation++;
  }

  /**
   * Set a cell's state
   */
  setCell(x: number, y: number, alive: boolean): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = alive;
    }
  }

  /**
   * Toggle a cell's state
   */
  toggleCell(x: number, y: number): void {
    this.setCell(x, y, !this.grid[y][x]);
  }

  /**
   * Reset the grid to empty state and generation to 0
   */
  reset(): void {
    this.grid = this.createGrid(false);
    this.generation = 0;
  }

  /**
   * Populate the grid with random cells
   */
  randomize(probability: number = 0.3): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = Math.random() < probability;
      }
    }
  }

  /**
   * Count the total number of alive cells
   */
  getAliveCellCount(): number {
    let count = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x]) count++;
      }
    }
    return count;
  }
}
