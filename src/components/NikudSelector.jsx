import React from 'react';

const NIKUD_LIST = [
    { char: '\u05B0', name: 'Shva' },
    { char: '\u05B1', name: 'Hataf Segol' },
    { char: '\u05B2', name: 'Hataf Patah' },
    { char: '\u05B3', name: 'Hataf Qamats' },
    { char: '\u05B4', name: 'Hiriq' },
    { char: '\u05B5', name: 'Tsere' },
    { char: '\u05B6', name: 'Segol' },
    { char: '\u05B7', name: 'Patah' },
    { char: '\u05B8', name: 'Qamats' },
    { char: '\u05B9', name: 'Holam' },
    { char: '\u05BB', name: 'Qubuts' },
    { char: '\u05BC', name: 'Dagesh' },
    { char: '\u05C1', name: 'Shin Dot' },
    { char: '\u05C2', name: 'Sin Dot' }
];

const NikudSelector = ({ onSelect, onClose, anchorRect }) => {
    // If we had an anchorRect, we could position absolutely.
    // For mobile simplified UX, let's make it a bottom sheet or a modal overlay.

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20" onClick={onClose}>
            <div
                className="w-full bg-white rounded-t-2xl p-4 shadow-lg animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="grid grid-cols-5 gap-2">
                    {NIKUD_LIST.map((n) => (
                        <button
                            key={n.name}
                            onClick={() => onSelect(n.char)}
                            className="aspect-square text-3xl font-bold bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 flex items-center justify-center relative"
                        >
                            <span className="opacity-30 absolute">ס</span>
                            <span className="text-4xl">{n.char}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NikudSelector;
