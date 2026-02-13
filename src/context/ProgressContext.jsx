import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [completedWords, setCompletedWords] = useState([]);
    const [score, setScore] = useState(0);

    // Load progress from local storage on mount?
    // For simplicity, maybe we just reset on reload or save minimally.
    // The specs say "1-10 step indicator", implies we track session progress.

    const nextWord = () => {
        setCurrentWordIndex(prev => prev + 1);
    };

    const markWordComplete = (word) => {
        if (!completedWords.includes(word)) {
            setCompletedWords([...completedWords, word]);
            setScore(prev => prev + 10);
        }
        nextWord();
    };

    const resetProgress = () => {
        setCurrentWordIndex(0);
        setCompletedWords([]);
        setScore(0);
    };

    return (
        <ProgressContext.Provider value={{
            currentWordIndex,
            setCurrentWordIndex,
            completedWords,
            score,
            markWordComplete,
            resetProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
