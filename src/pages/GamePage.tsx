import { useEffect, useState } from "react";
import CluePanel from "../components/CluePanel";
import GameBoard from "../components/GameBoard";
import WinModal from "../components/WinModal";
import { useDailyPuzzle } from "../hooks/useDailyPuzzle";
import LoseModal from "../components/LoseModal";

export default function GamePage() {
    const { wordInfo, progress, makeGuess, puzzleNumber, playerStats } = useDailyPuzzle();
    const [winModalOpen, setWinModalOpen] = useState<boolean>(false);
    const [loseModalOpen, setLoseModalOpen] = useState<boolean>(false);

    //The user wins
    useEffect(() => {
        if (progress.won) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setWinModalOpen(true);
        }
    }, [progress.won]);

    //The user loses
    useEffect(() => {
        if (progress.lost) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoseModalOpen(true);
        }
    }, [progress.lost]);

    return (
        <div className="flex flex-col gap-3 m-5">
            <div className="text-5xl font-bold text-center p-2">Lungle</div>

            <div className="text-center flex flex-col-reverse gap-5 p-3 justify-center lg:flex-row">

                <GameBoard wordInfo={wordInfo} progress={progress} makeGuess={makeGuess} />

                <CluePanel progress={progress} wordInfo={wordInfo} />

                <WinModal open={winModalOpen}
                    puzzleNumber={puzzleNumber}
                    progress={progress}
                    playerStats={playerStats}
                    onClose={() => setWinModalOpen(false)} />

                <LoseModal open={loseModalOpen}
                    puzzleNumber={puzzleNumber}
                    progress={progress}
                    wordInfo={wordInfo}
                    playerStats={playerStats}
                    onClose={() => setLoseModalOpen(false)} />

            </div>
        </div>
    )
}