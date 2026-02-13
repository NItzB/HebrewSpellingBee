import React, { useState } from 'react';
import { useWords } from '../context/WordContext';

const AdminPanel = ({ onClose }) => {
    const { words, updateWords } = useWords();
    const [text, setText] = useState(words.join('\n'));

    const handleSave = () => {
        const newWords = text.split('\n').filter(w => w.trim() !== '');
        updateWords(newWords);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 text-2xl">✕</button>
                <h2 className="text-2xl font-bold mb-4 text-blue-900">ניהול מילים</h2>
                <p className="mb-2 text-gray-600">כתוב כל מילה בשורה חדשה (עם ניקוד):</p>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-64 border-2 border-blue-200 rounded-lg p-3 text-2xl font-sans leading-relaxed text-right"
                    dir="rtl"
                />

                <div className="mt-4 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold">ביטול</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md">שמור</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
