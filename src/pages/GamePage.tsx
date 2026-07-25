import CluePanel from "../components/CluePanel";
import GameBoard from "../components/GameBoard";
import { useDailyPuzzle } from "../hooks/useDailyPuzzle";

export default function GamePage() {
    const { wordInfo, progress, makeGuess } = useDailyPuzzle();

    return (
        <div className="flex flex-col pt-20 gap-3 h-screen outline m-5">
            <div className="text-5xl font-bold text-center outline">Lungle</div>

            <div className="text-center flex gap-5 p-3 justify-center">

                <GameBoard wordInfo={wordInfo} progress={progress} makeGuess={makeGuess} />

                <CluePanel progress={progress} wordInfo={wordInfo} />
            </div>
        </div>
    )
}