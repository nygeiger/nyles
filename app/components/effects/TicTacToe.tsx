import { useState, useEffect } from "react";

type SquaresType = (string | null)[];
type MoveRecord = { boardArray: SquaresType; movePlayed: { row: number | null; col: number | null } };

function getEmptyIndices(squares: SquaresType): number[] {
    return squares.reduce<number[]>((acc, v, i) => (v === null ? [...acc, i] : acc), []);
}

function calculateWinner(squares: SquaresType) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winningPlayer: squares[a] as string, winningSquares: [a, b, c] };
        }
    }
    return null;
}

function getHeuristic(squares: SquaresType, depth: number): number {
    const w = calculateWinner(squares);
    if (w?.winningPlayer === "O") return 10 - depth;
    if (w?.winningPlayer === "X") return depth - 10;
    return 0;
}

function minimaxPrune(
    squares: SquaresType,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
): number {
    const result = getHeuristic(squares, depth);
    const emptySquares = getEmptyIndices(squares)

    if (result !== 0 || emptySquares.length === 0) return result;

    if (isMaximizing) {
        let best = -Infinity;
        for (const i of emptySquares) {
            const next = squares.slice();
            next[i] = "O";
            best = Math.max(best, minimaxPrune
                (next, depth + 1, alpha, beta, false));
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break;
        }
        return best;
    } else {
        let best = Infinity;
        for (const i of emptySquares) {
            const next = squares.slice();
            next[i] = "X";
            best = Math.min(best, minimaxPrune
                (next, depth + 1, alpha, beta, true));
            beta = Math.min(beta, best);
            if (beta <= alpha) break;
        }
        return best;
    }
}

function getBotMove(squares: SquaresType): number {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (const i of getEmptyIndices(squares)) {
        const next = squares.slice();
        next[i] = "O";
        const s = minimaxPrune
            (next, 0, -Infinity, Infinity, false);
        if (s > bestScore) { bestScore = s; bestMove = i; }
    }
    return bestMove;
}

function Square({ value, onClick, isWinning, botEnabled, canHover }: {
    value: string | null;
    onClick: () => void;
    isWinning: boolean;
    botEnabled: boolean
    canHover: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`
        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:h-40 lg:w-40
        flex items-center justify-center
        text-3xl sm:text-4xl md:text-5xl font-bold
        border-1 border-slate-200
        ${isWinning ? "bg-emerald-500 border-emerald-300 text-emerald-600" : ""}
        ${value === "X" ? "text-slate-300" : botEnabled ? "text-rose-500" : "text-indigo-500"}
        ${canHover ? "hover:bg-slate-200 cursor-pointer" : "cursor-default"}
      `}
        >
            {value}
        </button>
    );
}

function Board({ squares, onPlay, xIsNext, currentTurn, botEnabled }: {
    squares: SquaresType;
    onPlay: (next: SquaresType, move: { row: number; col: number }) => void;
    xIsNext: boolean;
    currentTurn: number;
    botEnabled: boolean;
}) {
    const winnerCalc = calculateWinner(squares);
    const isDraw = !winnerCalc && currentTurn === 9;
    const gameOver = !!winnerCalc || isDraw;

    function handleClick(index: number) {
        if (squares[index] || gameOver) return;
        if (botEnabled && !xIsNext) return; // bot's turn
        const next = squares.slice();
        next[index] = xIsNext ? "X" : "O";
        onPlay(next, { row: Math.floor(index / 3), col: index % 3 });
    }

    let statusText = "";
    let statusColor = "text-slate-500";
    if (winnerCalc) {
        statusText = `${winnerCalc.winningPlayer} wins!`;
        // statusColor = winnerCalc.winningPlayer === "X" ? "text-slate-700" : "text-rose-500";
        statusColor = "text-white";
    } else if (isDraw) {
        statusText = "It's a draw";
    } else if (botEnabled && !xIsNext) {
        statusText = "Bot is thinking…";
        statusColor = "text-rose-400";
    } else {
        statusText = `${xIsNext ? "X" : "O"}'s turn`;
        // statusColor = xIsNext ? "text-slate-700" : "text-rose-500";
        // statusColor = "text-gray-100";
        statusColor = xIsNext ? "text-gray-100" : "text-indigo-500";
    }

    return (
        <div className="flex flex-col items-center gap-4 min-w-[241px]">
            <p className={`text-base sm:text-lg font-semibold tracking-wide ${statusColor} h-7`}>
                {statusText}
            </p>

            {/* Grid — no gap, rely on borders overlapping */}
            <div className="inline-grid grid-cols-3 border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {squares.map((val, i) => (
                    <Square
                        key={i}
                        value={val}
                        onClick={() => handleClick(i)}
                        isWinning={winnerCalc ? winnerCalc.winningSquares.includes(i) : false}
                        botEnabled={botEnabled}
                        canHover={!val && !gameOver && !(botEnabled && !xIsNext)}
                    />
                ))}
            </div>
        </div>
    );
}

export default function TicTacToe() {
    const [history, setHistory] = useState<MoveRecord[]>([
        { boardArray: Array(9).fill(null), movePlayed: { row: null, col: null } },
    ]);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [histAscending, setHistAscending] = useState(true);
    const [botEnabled, setBotEnabled] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const currentSquares = history[currentTurn].boardArray;
    const xIsNext = currentTurn % 2 === 0;

    // Bot move effect
    useEffect(() => {
        if (!botEnabled) return;
        const winner = calculateWinner(currentSquares);
        if (winner || currentTurn === 9) return;
        if (xIsNext) return; // human's turn

        const timer = setTimeout(() => {
            const move = getBotMove(currentSquares);
            if (move === -1) return;
            const next = currentSquares.slice();
            next[move] = "O";
            handlePlay(next, { row: Math.floor(move / 3), col: move % 3 });
        }, 300);

        return () => clearTimeout(timer);
    }, [currentTurn, botEnabled, xIsNext]);

    function handlePlay(nextSquares: SquaresType, latestMove: { row: number; col: number }) {
        const nextHistory = [
            ...history.slice(0, currentTurn + 1),
            { boardArray: nextSquares, movePlayed: latestMove },
        ];
        setHistory(nextHistory);
        setCurrentTurn(nextHistory.length - 1);
    }

    function handleReset() {
        setHistory([{ boardArray: Array(9).fill(null), movePlayed: { row: null, col: null } }]);
        setCurrentTurn(0);
    }

    function jumpTo(move: number) {
        setCurrentTurn(move);
    }

    const moves = history.map((entry, move) => {
        const isCurrentMove = move === currentTurn;
        const player = move % 2 === 0 ? "O" : "X";
        const coords = entry.movePlayed.row !== null
            ? `(${entry.movePlayed.row}, ${entry.movePlayed.col})`
            : "";
        const label = move === 0
            ? "Game start"
            : `Move ${move} — ${player} at ${coords}`;

        return (
            <li key={move} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrentMove ? "bg-slate-700" : "bg-slate-200"}`} />
                {isCurrentMove ? (
                    <span className="text-slate-700 font-medium text-xs sm:text-sm">{label}</span>
                ) : (
                    <button
                        onClick={() => jumpTo(move)}
                        className="text-slate-400 hover:text-slate-600 text-xs sm:text-sm text-left transition-colors"
                    >
                        {label}
                    </button>
                )}
            </li>
        );
    });

    const orderedMoves = histAscending ? moves : [...moves].reverse();

    return (
        <div className="bg-black flex flex-col items-center justify-start px-4 py-8 sm:py-12">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">

                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Tic-Tac-Toe
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {botEnabled ? "You play X · Bot plays O" : "Two player · local"}
                    </p>
                </div>

                {/* Board */}
                <Board
                    squares={currentSquares}
                    onPlay={handlePlay}
                    xIsNext={xIsNext}
                    currentTurn={currentTurn}
                    botEnabled={botEnabled}
                />

                {/* Action row */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                    <button
                        onClick={handleReset}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                    >
                        New game
                    </button>
                    <button
                        onClick={() => { setBotEnabled(currentVal => !currentVal); handleReset(); }}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${botEnabled
                                ? "bg-rose-50 border-rose-200 text-rose-600  hover:bg-slate-100"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-rose-100"
                            }`}
                    >
                        {botEnabled ? "Bot: ON" : "Bot: OFF"}
                    </button>
                    <button
                        onClick={() => setShowHistory(currentVal => !currentVal)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-cyan-100 transition-colors"
                    >
                        {showHistory ? "Hide history" : "Show history"}
                    </button>
                </div>

                {/* Move history */}
                {showHistory && (
                    <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                Move history
                            </span>
                            <button
                                onClick={() => setHistAscending(currentVal => !currentVal)}
                                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {histAscending ? "↑ Oldest first" : "↓ Newest first"}
                            </button>
                        </div>
                        <ol className="flex flex-col gap-2">{orderedMoves}</ol>
                    </div>
                )}
            </div>
        </div>
    );
}
