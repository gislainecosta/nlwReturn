import { useState } from "react";
import { CloseButton } from "./CloseButton";

import bugImageUrl from '../assets/bug.svg';
import ideaImageUrl from '../assets/idea.svg'
import thoughtImageUrl from '../assets/thought.svg'

const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl, 
            alt: "Imagem de um inseto"
        }
    },
    IDEA: {
        title: "Idéia",
        image: {
            source: ideaImageUrl, 
            alt: "Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "Imagem de um balão de pensamento"
        }
    }
}


type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

    console.log("Tipo de FeedBack", feedbackType)
    return (
        <div className="bg-zinc-900 p-4 relative rounded mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>

                <CloseButton />
            </header>

            {!feedbackType ? (
                <div className="flex py-8 gap-2 w-full">
                    {
                        Object.entries(feedbackTypes).map(([key, value]) => {
                            return (
                                <button
                                    onClick={() => setFeedbackType(key as FeedbackType)}
                                    key={key}
                                    className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-transparent hover:border-t-brand-500 focus:border-t-brand-500 focus:outline-none"
                                    type="button"
                                >
                                    <img src={value.image.source} alt={value.image.alt} />
                                    <span>{value.title}</span>
                                </button>
                            )
                        })
                    }
                </div>
            ) : (
                <p>{feedbackType}</p>
            )}

            <footer className='text-xs text-neutral-400'>
                Feito com ♥ pela <a className="underline underline-offset-2" target="_blank" href="https://www.rocketseat.com.br/">Rocketseat</a>
            </footer>
        </div>
    )
}