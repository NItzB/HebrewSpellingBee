import { useState, useEffect, useCallback } from 'react';

export const useHebrewSpeech = () => {
    const [voices, setVoices] = useState([]);
    const [hebrewVoice, setHebrewVoice] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);

            // Try to find a Hebrew voice
            const he = availableVoices.find(v => v.lang.startsWith('he'));
            setHebrewVoice(he || null);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const speak = useCallback((text) => {
        if (!text) return;

        // specific fix for iOS or some browsers requiring user interaction first
        // (handled by caller usually via button click)

        window.speechSynthesis.cancel(); // Stop previous

        const utterance = new SpeechSynthesisUtterance(text);
        if (hebrewVoice) {
            utterance.voice = hebrewVoice;
        }
        utterance.lang = 'he-IL';
        utterance.rate = 0.8; // Slightly slower for kids

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [hebrewVoice]);

    return { speak, isSpeaking, hasVoice: !!hebrewVoice };
};
