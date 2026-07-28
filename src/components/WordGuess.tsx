import { useEffect, useRef } from "react"
import type { Progress } from "../types";

type Props = {
    length: number;
    disabled?: boolean;
    text?: string;
    progress: Progress;
    setGuess?: (guess: string) => void;
}

export default function WordGuess({ disabled = false, length, text, progress, setGuess }: Props) {
    const refs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (!disabled && !text) {
            refs.current[0]?.focus();
        }
    }, [disabled, text, progress]);

    useEffect(() => {
        if (!text) {
            refs.current.forEach((input) => {
                if (input) {
                    input.value = "";
                }
            });
        }
    }, [progress, text]);

    return (
        <div className="flex gap-2 items-center justify-center">
            {text && Array.from({ length: text.length }).map((_, index) => (
                <input type="text"
                    key={index}
                    disabled={disabled}
                    value={text[index].toUpperCase()}
                    ref={el => { (refs.current[index] = el) }}
                    className="border bg-white h-10 w-10 lg:h-15 lg:w-15 text-4xl text-center 
                    caret-transparent font-bold"
                    maxLength={1}
                    readOnly />
            ))}

            {!text && Array.from({ length: length }).map((_, index) => (
                <input type="text"
                    key={index}
                    disabled={disabled}
                    ref={el => { (refs.current[index] = el) }}
                    className="border bg-white h-10 w-10 lg:h-15 lg:w-15 text-4xl text-center 
                    caret-transparent font-bold"
                    maxLength={1}
                    onChange={(e) => {
                        if (e.target.value && index < refs.current.length) {
                            if (refs.current[index]) {
                                refs.current[index].value = e.target.value.toUpperCase().slice(0,1);
                            }
                            refs.current[index + 1]?.focus();
                        }
                        const guess = refs.current.map((input) => input?.value.slice(0,1) || "").join("");
                        if(setGuess){
                            setGuess(guess);
                        } 
                    }}
                    onKeyDownCapture={(e) => {
                        if (e.key === "Backspace") {
                            //Don't go back if it's the last input and it's not empty
                            if (!((index == refs.current.length - 1) && !!refs.current[index]?.value)) {
                                refs.current[index - 1]?.focus();
                            }
                        }
                    }}
                    onFocus={(e) => e.target.select()}
                />
            ))}
        </div>
    )
}