import { languageList } from "../data/languageList";
import type { Progress, WordInfo } from "../types";

type Props = {
    progress: Progress;
    wordInfo: WordInfo;
}

export default function CluePanel({ progress, wordInfo }: Props) {

    const speakWord = (word: string, code: string) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = code;
        speechSynthesis.cancel(); // Cancel any ongoing speech
        speechSynthesis.speak(utterance);
    }

    return (
        <div className=" gap-3 w-3/10">
            <p className="text-3xl font-bold p-3">Clues:</p>
            <div className="card bg-base-200 min-h-100 p-2 gap-2">
                <ul className="list">
                    {progress && progress.language_ids.map((language_id, index) => (
                        <li className="flex gap-2 items-center justify-center" key={index}>
                            <p className="text-2xl">{wordInfo.language_details.find(x => x.language_id == language_id)?.translation}</p>
                            <button className="btn btn-ghost btn-circle"
                                onClick={() => speakWord(wordInfo.language_details.find(x => x.language_id == language_id)?.translation || "",
                                    languageList.find(x => x.language_id == language_id)?.code || "en-US")
                                }>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5 6 9H3v6h3l5 4V5zm5.5 3a6 6 0 010 8m2.5-10a9 9 0 010 12" /></svg>
                            </button>

                            <img src={`${languageList.find(x => x.language_id == language_id)?.flags[0].toLowerCase()}.svg`}
                                alt={languageList.find(x => x.language_id == language_id)?.name}
                                className="h-5 w-5" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}