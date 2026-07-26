import { languageList } from "../data/languageList";
import type { Progress, WordInfo } from "../types";

type Props = {
    open: boolean;
    puzzleNumber: number;
    progress: Progress;
    wordInfo: WordInfo;
    onClose: () => void;
}

export default function WinModal({ open, puzzleNumber, progress, wordInfo, onClose }: Props) {
    if (!open) {
        return null;
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box flex flex-col gap-3 items-center justify-center">
                <h1 className="text-2xl font-bold">Lungle #{puzzleNumber}</h1>
                <p className="text-xl">You Lost!</p>
                <p>The word was {wordInfo.word}.</p>
                {progress.language_ids.map((language_id, index) => (
                    <div key={language_id} className="flex gap-4 items-center me-8">
                        <p>Language #{index + 1}</p>
                        <img src={`${languageList.find(x => x.language_id == language_id)?.flags[0].toLowerCase()}.svg`}
                            alt={languageList.find(x => x.language_id == language_id)?.name}
                            className="h-5 w-5" />
                    </div>
                ))}
                <button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}