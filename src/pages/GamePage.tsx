import { useEffect, useState } from "react";
import CluePanel from "../components/CluePanel";
import GameBoard from "../components/GameBoard";
import WinModal from "../components/WinModal";
import { useDailyPuzzle } from "../hooks/useDailyPuzzle";
import LoseModal from "../components/LoseModal";

export default function GamePage() {
    const { wordInfo, progress, makeGuess, won, lost, puzzleNumber } = useDailyPuzzle();
    const [winModalOpen, setWinModalOpen] = useState<boolean>(false);
    const [loseModalOpen, setLoseModalOpen] = useState<boolean>(false);

    //The user wins
    useEffect(() => {
        if (won) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setWinModalOpen(true);
        }
    }, [won]);

    //The user loses
    useEffect(() => {
        if (lost) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoseModalOpen(true);
        }
    }, [lost]);

    return (
        <div className="flex flex-col gap-3 outline m-5">
            <div className="text-5xl font-bold text-center outline">Lungle</div>

            <div className="text-center flex gap-5 p-3 justify-center">

                <GameBoard wordInfo={wordInfo} progress={progress} makeGuess={makeGuess} won={won} lost={lost} />

                <CluePanel progress={progress} wordInfo={wordInfo} />

                <WinModal open={winModalOpen}
                    puzzleNumber={puzzleNumber}
                    progress={progress}
                    onClose={() => setWinModalOpen(false)} />

                <LoseModal open={loseModalOpen}
                    puzzleNumber={puzzleNumber}
                    progress={progress}
                    wordInfo={wordInfo}
                    onClose={() => setLoseModalOpen(false)} />

            </div>
        </div>
    )
}