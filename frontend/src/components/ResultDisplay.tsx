import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ResultDisplayProps {
    result: {
      term: string;
      original_term: string;
      generation: string;
      definition: string;
      equivalents: Record<string, string>;
    } | null;
  }
  
  const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    if (!result) return null;
  
    return (
      <motion.div
        className="w-full max-w-md mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{result.term}</CardTitle>
            {result.term !== result.original_term && (
              <p className="text-sm text-muted-foreground">
                Matched from: {result.original_term}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <span className="font-semibold">Generation:</span> {result.generation}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Definition:</span> {result.definition}
            </p>
            <h3 className="text-xl font-semibold mb-2">Generational Equivalents:</h3>
            {Object.entries(result.equivalents).length > 0 ? (
              <ul className="list-disc list-inside">
                {Object.entries(result.equivalents).map(([gen, term]) => (
                  <li key={gen}>
                    <span className="font-semibold">{gen}:</span> {term}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No equivalents found in other generations.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

export default ResultDisplay;