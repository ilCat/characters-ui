import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import type { Character } from './types/character';
import { INITIAL_CHARACTERS } from './data/mockCharacters';

const AppContent: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('characters-ui-data');
    return saved ? JSON.parse(saved) : INITIAL_CHARACTERS;
  });

  useEffect(() => {
    const saved = localStorage.getItem('characters-ui-data');
    if (saved) {
      try {
        setCharacters(JSON.parse(saved));
      } catch {
        // use initial
      }
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        characters={characters}
      />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
