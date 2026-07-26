import { useState } from "react";
import type { Progress, WordInfo } from "../types";
import WordGuess from "./WordGuess";

type Props = {
    progress: Progress;
    wordInfo: WordInfo;
    makeGuess: (guess: string) => void;
    won: boolean;
    lost: boolean;
}

export default function GameBoard({ progress, makeGuess, wordInfo, won, lost }: Props) {
    const [guess, setGuess] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!won && !lost && guess.length == wordInfo.word.length) {
            makeGuess(guess);
            setGuess('');
        }
    }

    return (
        <div className="flex flex-col gap-3 flex-1 w-7/10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <p className="text-3xl font-bold p-3">Make a guess!</p>
                {/*Show guesses first */}
                {progress.guesses.map((guess, index) => (
                    <WordGuess key={index} length={wordInfo.word.length} text={guess} progress={progress} />
                ))}

                {/*Show remaining empty rows - three or up to seven */}
                {Array.from({
                    length: progress.guesses.length < 5
                        ? 3
                        : 7 - progress.guesses.length
                }).map((_, index) => (
                    (index > 0 || !(won || lost)) && <WordGuess key={index} disabled={index > 0} length={wordInfo.word.length}
                        progress={progress} setGuess={setGuess} />
                ))}

                <div className="align-items-center mt-5">
                    <button className="btn btn-primary text-center w-20"
                        type="submit">Guess</button>
                </div>
            </form>


        </div>
    )
}
