import { useEffect, useState } from "react";
import type { Progress, WordInfo } from "../types";
import { wordList } from "../data/wordList";
import { languageList } from "../data/languageList";

//Retrieve daily word and user progress, and make guesses and store progress
export function useDailyPuzzle() {
    const [wordInfo] = useState<WordInfo>(getDailyPuzzle());
    const [progress, setProgress] = useState<Progress>({ guesses: [], language_ids: [] });


    useEffect(() => {
        console.log("Saving progress to local storage:", progress);
        localStorage.setItem("progress", JSON.stringify(progress));
    }, [progress]);

    //Load progress from local storage, or pick initial language if none exists
    useEffect(() => {
        const saved = localStorage.getItem("progress");
        if (saved) {
            const parsed: Progress = JSON.parse(saved);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProgress(parsed);
            if (parsed.language_ids.length === 0) {
                const filteredLanguages = languageList.filter(lang => lang.language_id !== "en");
                const randomIndex = Math.floor(Math.random() * filteredLanguages.length);
                const language = filteredLanguages[randomIndex];
                setProgress((prev) => ({
                    ...prev,
                    language_ids: [...prev.language_ids, language.language_id],
                }));
            }
        }


    }, []);

    const makeGuess = (guess: string) => {
        //Make guesses and save progress to local storage
        setProgress((prev) => ({
            ...prev,
            guesses: [...prev.guesses, guess],
        }));


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

    return { wordInfo, progress, makeGuess };
}

export function getDailyPuzzle(): WordInfo {

    return wordList[0]; // Placeholder for daily puzzle logic;
}