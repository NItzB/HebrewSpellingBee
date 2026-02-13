import React, { useState } from 'react';
import NikudSelector from './NikudSelector';

const HEBREW_LETTERS = [
    'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ',
    'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף',
    'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'
]; // Approximate layout, can verify QWERTY-hebrew mapping or just Aleph-Bet

// Let's use standard logical order or just a grid?
// QWERTY-based is familiar to computer users:
// / ' ק ר א ט ו ן ם פ ]
// ש ד ג כ ע י ח ל ך ף ,
// ז ס ב ה נ מ צ ת ץ .
// 
// But for 2nd graders, maybe Alphabetical is better? Or QWERTY if they learn typing?
// Let's stick to the QWERTY-ish visual layout commonly found on phones.
// Row 1: ק ר א ט ו ן ם פ
// Row 2: ש ד ג כ ע י ח ל ך ף
// Row 3: ז ס ב ה נ מ צ ת ץ

const ROW1 = ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'];
const ROW2 = ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'];
const ROW3 = ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'];

const VirtualKeyboard = ({ onInput, onDelete, onSubmit }) => {
    const [showNikudFor, setShowNikudFor] = useState(null); // { char, index? no, input field manages cursor }

    // Actually, keyboard just emits chars. The parent input manages the text.
    // BUT the requirements say: "When a letter is typed, show a 'Nikud Tray'"
    // So the keyboard might intercept the letter click, emit it, AND show the tray?
    // Or just emit the letter, and let the parent handle the Tray?
    // Use case: Child clicks 'Aleph'. Aleph appears. Tray appears. Child clicks 'Kamatz'. Aleph gets Kamatz.

    // Let's make the keyboard simpler:
    // It has keys. When key pressed -> onInput(char).
    // The Parent (GameScreen) will handle showing NikudSelector if needed.

    // BUT: The user asked for "Keyboard Component uses Nikud Tray".
    // Let's bundle it inside if we want it self-contained.
    // Actually, if we type a letter, we likely want to invoke the Nikud tray immediately.

    const handleLetterClick = (char) => {
        onInput(char);
        // Open Nikud tray for this char?
        // Let's assume onInput handles adding the char to the text.
        // We can trigger an onRequestNikud() callback?
        // Or just make this component control the Nikud UI.
        setShowNikudFor(char);
    };

    const handleNikudSelect = (nikud) => {
        onInput(nikud); // Append nikud to the last char
        setShowNikudFor(null);
    };

    return (
        <div className="w-full bg-slate-200 p-2 pb-6 rounded-t-3xl shadow-inner mt-auto">
            {/* Suggestions / Toolbar? */}
            <div className="flex justify-end pr-2 mb-2">
                <button onClick={onDelete} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold shadow-sm">
                    ⌫ מחיקה
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-1">
                    {ROW1.map(char => (
                        <Key key={char} char={char} onClick={() => handleLetterClick(char)} />
                    ))}
                </div>
                <div className="flex justify-center gap-1">
                    {ROW2.map(char => (
                        <Key key={char} char={char} onClick={() => handleLetterClick(char)} />
                    ))}
                </div>
                <div className="flex justify-center gap-1">
                    {ROW3.map(char => (
                        <Key key={char} char={char} onClick={() => handleLetterClick(char)} />
                    ))}
                </div>

                {/* Space / Submit */}
                <div className="flex justify-center gap-2 mt-2">
                    <button onClick={() => onInput(' ')} className="w-1/2 bg-white rounded-lg shadow-md p-3 font-bold">רווח</button>
                    <button onClick={onSubmit} className="w-1/4 bg-green-500 text-white rounded-lg shadow-md p-3 font-bold">בדיקה</button>
                </div>
            </div>

            {showNikudFor && (
                <NikudSelector
                    onSelect={handleNikudSelect}
                    onClose={() => setShowNikudFor(null)}
                />
            )}
        </div>
    );
};

const Key = ({ char, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white hover:bg-slate-50 active:bg-slate-200 shadow-md rounded-lg w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-800 transition-transform active:scale-95"
    >
        {char}
    </button>
);

export default VirtualKeyboard;
