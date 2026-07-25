export type WordInfo = {
    word: string;
    language_details: LanguageDetail[];
}

export type LanguageDetail = {
    language_id: string;
    translation: string;
}

export type Language = {
    language_id: string;
    name: string;
    code: string;
    flags: string[];
}

export type Progress = {
    guesses: string[];
    language_ids: string[];
}