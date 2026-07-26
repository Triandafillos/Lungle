import { useEffect, useState } from "react";
import type { PlayerStats } from "../types";
import { getDailyPuzzleNumber } from "./useDailyPuzzle";

export function usePlayerStats() {
    const [playerStats, setPlayerStats] = useState<PlayerStats>(getInitialStats())

    //Save progress to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("stats", JSON.stringify(playerStats));
    }, [playerStats]);

    const recordWin = (() => {
        const puzzleNumber = getDailyPuzzleNumber();
        const streak = puzzleNumber == (playerStats.lastPuzzleWon + 1) ? playerStats.streak + 1 : 1;
        const newStats: PlayerStats = {
            gamesPlayed: playerStats.gamesPlayed + 1,
            gamesWon: playerStats.gamesWon + 1,
            streak: streak,
            lastPuzzleWon: puzzleNumber
        }

        setPlayerStats(newStats);
    });

    const recordLoss = (() => {
        const newStats: PlayerStats = {
            gamesPlayed: playerStats.gamesPlayed + 1,
            gamesWon: playerStats.gamesWon,
            streak: 0,
            lastPuzzleWon: playerStats.lastPuzzleWon
        }

        setPlayerStats(newStats);
    });

    return { playerStats, recordWin, recordLoss }
}

export function getInitialStats(): PlayerStats {
    const saved = localStorage.getItem("stats");
    return saved ? JSON.parse(saved) : {gamesPlayed: 0, gamesWon: 0, streak: 0, lastPuzzleWon: 0}
}