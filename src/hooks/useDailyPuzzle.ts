import { useEffect, useState } from "react";
import type { Progress, WordInfo } from "../types";
import { wordList } from "../data/wordList";
import { languageList } from "../data/languageList";
import { usePlayerStats } from "./usePlayerStats";

//Retrieve daily word and user progress, and make guesses and store progress
export function useDailyPuzzle() {
    const [wordInfo] = useState<WordInfo>(getDailyPuzzle());
    const [progress, setProgress] = useState<Progress>(getInitialProgress());
    const [puzzleNumber] = useState<number>(getDailyPuzzleNumber);
    const { playerStats, recordWin, recordLoss } = usePlayerStats();

    //Save progress to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("progress", JSON.stringify(progress));
    }, [progress]);

    const makeGuess = (guess: string) => {
        //Make guesses and save progress to local storage
        setProgress((prev) => ({
            ...prev,
            guesses: [...prev.guesses, guess],
        }));

        //Check if the guess is correct
        if (guess.toLowerCase() === wordInfo.word.toLowerCase()) {
            recordWin(progress.guesses.length+1);
            setProgress((prev) => ({
                ...prev,
                won: true
            }));
            return;
        } else if (progress.guesses.length + 1 >= 7) {
            recordLoss();
            setProgress((prev) => ({
                ...prev,
                lost: true
            }));
            return;
        }

        //Pick a random language other than English and not already given
        const filteredLanguages = languageList
            .filter(lang => lang.language_id !== "en"
                && !progress.language_ids.includes(lang.language_id));
        if (filteredLanguages.length != 0) {
            const randomIndex = Math.floor(Math.random() * filteredLanguages.length);
            const language = filteredLanguages[randomIndex];
            setProgress((prev) => ({
                ...prev,
                language_ids: [...prev.language_ids, language.language_id],
            }));
        }
    };

    return { wordInfo, progress, makeGuess, puzzleNumber, playerStats };
}

export function getDailyPuzzle(): WordInfo {
    const index = getDailyPuzzleNumber()

    return wordList[index];
}

export function getInitialProgress(): Progress {
    const saved = localStorage.getItem("progress");
    const currentPuzzleNumber = getDailyPuzzleNumber();
    let resetData = true;
    let progress: Progress = { guesses: [], language_ids: [], won: false, lost: false, puzzleNumber: currentPuzzleNumber };

    if (saved) {
        progress = JSON.parse(saved);
        if (progress.puzzleNumber == currentPuzzleNumber) {
            resetData = false;
        }
    }

    if (resetData) {
        const filteredLanguages = languageList.filter(lang => lang.language_id !== "en");
        const randomIndex = Math.floor(Math.random() * filteredLanguages.length);
        const language = filteredLanguages[randomIndex];
        progress = {
            guesses: [],
            language_ids: [language.language_id],
            won: false,
            lost: false,
            puzzleNumber: currentPuzzleNumber
        }
    }

    return progress;
}

export function getDailyPuzzleNumber() {
    const today = new Date();

    // Convert milliseconds to days
    const msInDay: number = 1000 * 60 * 60 * 24;
    return Math.floor((today.getTime() - new Date(2026, 6, 25).getTime()) / msInDay) % wordList.length;

}