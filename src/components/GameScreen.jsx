import React, { useState, useEffect } from 'react';
import { useWords } from '../context/WordContext';
import { useProgress } from '../context/ProgressContext';
import { useHebrewSpeech } from '../hooks/useHebrewSpeech';
import VirtualKeyboard from './VirtualKeyboard';
import AdminPanel from './AdminPanel';
import confetti from 'canvas-confetti';

const GameScreen = () => {
    const { words } = useWords();
    const { currentWordIndex, markWordComplete, completedWords } = useProgress();
    const { speak } = useHebrewSpeech();

    const [userInput, setUserInput] = useState('');
    const [showAdmin, setShowAdmin] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null

    // Ensure index is valid (loop or finish?)
    const isFinished = currentWordIndex >= words.length;
    const currentWord = !isFinished ? words[currentWordIndex] : null;

    useEffect(() => {
        if (currentWord) {
            speak(currentWord);
            setUserInput('');
            setFeedback(null);
        }
    }, [currentWordIndex, speak, currentWord]);

    const handleInput = (char) => {
        setUserInput(prev => prev + char);
    };

    const handleDelete = () => {
        setUserInput(prev => prev.slice(0, -1));
    };

    const checkAnswer = () => {
        if (!currentWord) return;

        if (userInput.trim() === currentWord.trim()) {
            // Correct!
            setFeedback('correct');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            // Play sound? (Optional)

            setTimeout(() => {
                markWordComplete(currentWord);
            }, 1500);
        } else {
            // Incorrect
            setFeedback('incorrect');
            // Shake animation logic handled by CSS class
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-blue-50 p-4">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">כל הכבוד! 🎉</h1>
                <p className="text-2xl text-blue-600">סיימת את כל המילים!</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg"
                >
                    התחל מחדש
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-blue-50 relative overflow-hidden">
            {/* Header / Admin */}
            <div className="flex justify-between items-center p-4">
                <div className="text-blue-800 font-bold text-lg">
                    מילה {currentWordIndex + 1} מתוך {words.length}
                </div>
                <button onClick={() => setShowAdmin(true)} className="text-blue-300 hover:text-blue-500">
                    ⚙️
                </button>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex flex-col items-center justify-start pt-10 px-4 gap-8">

                {/* Play Button */}
                <button
                    onClick={() => speak(currentWord)}
                    className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                >
                    <span className="text-4xl">🔊</span>
                </button>
                <p className="text-blue-400 text-sm">לחץ לשמיעת המילה</p>

                {/* Input Display */}
                <div
                    className={`
            w-full max-w-md bg-white rounded-xl shadow-inner border-2 min-h-[80px] flex items-center justify-center p-4
            text-4xl font-bold tracking-wider text-blue-900
            ${feedback === 'correct' ? 'border-green-500 bg-green-50' : ''}
            ${feedback === 'incorrect' ? 'border-red-500 bg-red-50 animate-shake' : 'border-blue-200'}
          `}
                >
                    {userInput || <span className="text-gray-300 opacity-50">...</span>}
                </div>

            </div>

            {/* Keyboard */}
            <VirtualKeyboard
                onInput={handleInput}
                onDelete={handleDelete}
                onSubmit={checkAnswer}
            />

            {/* Admin Modal */}
            {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        </div>
    );
};

export default GameScreen;
