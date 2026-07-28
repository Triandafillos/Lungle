import { languageList } from "../data/languageList";
import type { PlayerStats, Progress } from "../types";
import { copyResult, shareResult } from "../util/share";

type Props = {
    open: boolean;
    puzzleNumber: number;
    progress: Progress;
    playerStats: PlayerStats
    onClose: () => void;
}

export default function WinModal({ open, puzzleNumber, progress, playerStats, onClose }: Props) {
    if (!open) {
        return null;
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box flex flex-col gap-3 items-center justify-center">
                <h1 className="text-2xl font-bold">Lungle #{puzzleNumber}</h1>
                <p className="text-xl">You Won!</p>
                <p>I got the word in {progress.guesses.length} {progress.guesses.length == 1 ? 'guess' : 'guesses'}!</p>
                {progress.language_ids.map((language_id, index) => (
                    <div key={language_id} className="flex gap-4 items-center me-8">
                        <p>Language #{index + 1}</p>
                        <img src={`${languageList.find(x => x.language_id == language_id)?.flags[0].toLowerCase()}.svg`}
                            alt={languageList.find(x => x.language_id == language_id)?.name}
                            className="h-5 w-5" />
                    </div>
                ))}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 lg:flex-row lg:gap-3 items-center">
                        <p>Games Played: {playerStats.gamesPlayed}</p>
                        <p>Games Won: {playerStats.gamesWon}</p>
                        <p>Streak: {playerStats.streak}</p>
                        {playerStats.totalGuesses && <p>Average Score: {playerStats.totalGuesses / playerStats.gamesPlayed}</p>}
                    </div>
                    <div>
                        {/* Copy result */}
                        <button className="btn btn-ghost" onClick={() => copyResult(progress, playerStats)}><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 8V5a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-3M8 8H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M8 8h9v9"
                            />
                        </svg></button>
                        {/* Share result */}
                        <button className="btn btn-ghost" onClick={() => shareResult(progress, playerStats)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zm9 9a3 3 0 100-6 3 3 0 000 6z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.7 10.8l3.6-2.1M12.3 15.3l-3.6-2.1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
