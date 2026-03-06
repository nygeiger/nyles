'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { GameOfLife } from '@/app/classes/gameOfLife';

const DEFAULT_GRID_DIMENSIONS = { x: 45, y: 45 }

export default function GameOfLifeComponent() {
    const CELL_SIZE = 6;
    const GRID_WIDTH = DEFAULT_GRID_DIMENSIONS.x;
    const GRID_HEIGHT = DEFAULT_GRID_DIMENSIONS.y;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<GameOfLife>(new GameOfLife(GRID_WIDTH, GRID_HEIGHT));
    const [isRunning, setIsRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [aliveCount, setAliveCount] = useState(0);
    const [speed, setSpeed] = useState(2);
    const frameCounterRef = useRef(0);
    const animationRef = useRef<number | undefined>(undefined);

    const drawGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const game = gameRef.current;
        const grid = game.getGrid();

        // Clear canvas
        // ctx.fillStyle = '#ffffff';
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        ctx.strokeStyle = '#757272';
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= GRID_WIDTH; x++) {
            ctx.beginPath();
            ctx.moveTo(x * CELL_SIZE, 0);
            ctx.lineTo(x * CELL_SIZE, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= GRID_HEIGHT; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * CELL_SIZE);
            ctx.lineTo(canvas.width, y * CELL_SIZE);
            ctx.stroke();
        }

        // Draw alive cells
        // ctx.fillStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (grid[y][x]) {
                    ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                }
            }
        }
    }, []);

    const handleStep = useCallback(() => {
        gameRef.current.step();
        setGeneration(gameRef.current.getGeneration());
        setAliveCount(gameRef.current.getAliveCellCount());
        drawGrid();
    }, [drawGrid]);

    useEffect(() => {
        if (!isRunning) return;

        const animate = () => {
            frameCounterRef.current++;
            if (frameCounterRef.current >= 4 / speed) {
                gameRef.current.step();
                setGeneration(gameRef.current.getGeneration());
                setAliveCount(gameRef.current.getAliveCellCount());
                drawGrid();
                frameCounterRef.current = 0;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        frameCounterRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRunning, speed]);

    useEffect(() => {
        // Initialize the game on first render only
        gameRef.current.randomize(0.2);
        setAliveCount(gameRef.current.getAliveCellCount());
        drawGrid();
    }, []);


    const handlePlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleClear = () => {
        setIsRunning(false);
        gameRef.current.reset();
        setGeneration(0);
        setAliveCount(0);
        drawGrid();
    };

    const handleRandomize = () => {
        gameRef.current.reset();
        gameRef.current.randomize(0.2);
        setGeneration(0);
        setAliveCount(gameRef.current.getAliveCellCount());
        drawGrid();
    };

    return (
        <div className="grid grid-row-5 gap-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Conway's Game of Life</h2>
                <p className="text-sm text-gray-600 mb-4">
                    A cellular automaton where cells evolve based on their neighbors. Watch patterns emerge and evolve.
                </p>
            </div>

            <div className="flex gap-3 flex-rows-2 md:flex-cols-2">
                <canvas
                    ref={canvasRef}
                    className={`col-span-9 w-5/6 md:w-lg lg:w-2xl`}
                    width={GRID_WIDTH * CELL_SIZE}
                    height={GRID_HEIGHT * CELL_SIZE}
                />
                <div>
                    <div>Generation</div><div>{generation}</div>
                    <hr className="my-2 text-center"></hr>
                    <div>Alive Cells</div><div>{aliveCount}</div>
                    <hr className="my-2 text-center"></hr>
                    <div>Density</div><div>{((aliveCount / (GRID_HEIGHT * GRID_WIDTH)) * 100).toFixed(2)}%</div>
                </div>
            </div>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={handlePlayPause}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-600 transition-colors font-medium"
                >
                    {isRunning ? <>&#9632;</> : <>&#9658;</>}
                </button>
                <button
                    onClick={handleStep}
                    disabled={isRunning}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Step
                </button>
                <button
                    onClick={handleRandomize}
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors font-medium"
                >
                    Randomize
                </button>
                <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors font-medium"
                >
                    Clear
                </button>
                <select
                    onChange={(e) => setSpeed(parseInt(e.currentTarget.value))}
                    id="animationSpeed"
                    value={speed}
                    className="border border-gray-300 rounded bg-white text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={1}>.5x</option>
                    <option value={2}>1x</option>
                    <option value={3}>2x</option>
                    <option value={4}>3x</option>
                </select>
            </div>
        </div>
    );
}
