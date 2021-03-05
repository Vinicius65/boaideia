import { createContext, useState } from "react";

type TFeedbackContext = {
    type: 'error' | 'success' | 'warning';
    isVisible: boolean;
    title: string;
    message?: string
}

type TProp = {
    setFeedback: (feedback: TFeedbackContext) => void;
    feedback: TFeedbackContext
}

export const FeedbackContext = createContext({} as TProp)

export default function FeedbackProvider({ children }) {

    const [feedback, setFeedback] = useState({
        isVisible: false,
        title: '',
        type: 'error'
    } as TFeedbackContext)

    return (
        <FeedbackContext.Provider value={{ feedback, setFeedback }}>
            { children}
        </FeedbackContext.Provider>
    )
}
