import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [result, setResult] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

  const handleSearch = async (term: string) => {
    try {
      const response = await axios.get(`${API_URL}/translate?term=${term}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching translation:', error);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Slang Translator</h1>
      <SearchBar onSearch={handleSearch} />
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;