import { flagMap } from "../data/flagMap";
import { languageList } from "../data/languageList";
import type { PlayerStats, Progress } from "../types";

export async function shareResult(progress: Progress, playerStats: PlayerStats) {
    const text = getShareText(progress, playerStats);

    await navigator.share({
        title: `Lungle #${progress.puzzleNumber}`,
        text: text
    });

}

export async function copyResult(progress: Progress, playerStats: PlayerStats) {
    const text = getShareText(progress, playerStats);

    await navigator.clipboard.writeText(text);
}

export function getShareText(progress: Progress, playerStats: PlayerStats): string {
    let text = `**Lungle #${progress.puzzleNumber}**\n`;
    if (progress.won) {
        text = text + `I got the word in ${progress.guesses.length} ${progress.guesses.length == 1 ? 'guess' : 'guesses'}!\n`
    }
    if (progress.lost) {
        text = text + "I wasn't able to guess the word today...\n"
    }
    progress.language_ids.map((language_id, index) => {
        const languageCode: string = languageList.find(x => x.language_id == language_id)?.flags[0].toLowerCase() || 'bd';
        const flag = flagMap[languageCode] || '';
        text = text + `Language #${index + 1} ${flag}\n`

    });
    text = text + `Games Played: ${playerStats.gamesPlayed}\tGames Won: ${playerStats.gamesWon}\tStreak: ${playerStats.streak}\n`;
    text = text + 'https://lungle.georgepapadakis.com/play';
    return text;
}