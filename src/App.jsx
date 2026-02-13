import React from 'react';
import { WordProvider } from './context/WordContext';
import { ProgressProvider } from './context/ProgressContext';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <WordProvider>
      <ProgressProvider>
        <GameScreen />
      </ProgressProvider>
    </WordProvider>
  );
}

export default App;
