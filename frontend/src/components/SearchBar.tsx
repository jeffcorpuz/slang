import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (term.length > 1) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
          const response = await axios.get(`${API_URL}/autocomplete?prefix=${term}`);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <motion.div
      className="w-full max-w-md relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter slang term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          ref={inputRef}
        />
        <Button type="submit">Translate</Button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <motion.ul
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default SearchBar;