import { createContext, useContext, useState, useEffect } from 'react';

const WordContext = createContext();

const DEFAULT_WORDS = [
    'שָׁלוֹם',
    'כִּיתָה',
    'סֵפֶר',
    'יֶלֶד',
    'שֶׁמֶשׁ',
    'בַּיִת',
    'פֶּרַח',
    'כַּדּוּר',
    'תַּפּוּחַ',
    'גִּינָה'
];

export const WordProvider = ({ children }) => {
    const [words, setWords] = useState(() => {
        const saved = localStorage.getItem('spellingBeeWords');
        return saved ? JSON.parse(saved) : DEFAULT_WORDS;
    });

    useEffect(() => {
        localStorage.setItem('spellingBeeWords', JSON.stringify(words));
    }, [words]);

    const updateWords = (newWords) => {
        setWords(newWords);
    };

    const resetWords = () => {
        setWords(DEFAULT_WORDS);
    };

    return (
        <WordContext.Provider value={{ words, updateWords, resetWords }}>
            {children}
        </WordContext.Provider>
    );
};

export const useWords = () => useContext(WordContext);
