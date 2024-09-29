import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResultDisplayProps {
  result: {
    original_text: string;
    translated_text: string;
    slang_translations: Record<string, { definition: string; generation: string }>;
  } | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  const boldSlangWords = (text: string, slangWords: string[]) => {
    const words = text.split(' ');
    return words.map((word, index) => 
      slangWords.includes(word.toLowerCase()) ? 
        <strong key={index}>{word} </strong> : 
        word + ' '
    );
  };

  return (
    <motion.div
      className="w-full max-w-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Translation Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <span className="font-semibold">Original Text:</span>{' '}
            {boldSlangWords(result.original_text, Object.keys(result.slang_translations))}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Translated Text:</span> {result.translated_text}
          </p>
          {Object.keys(result.slang_translations).length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-2">Slang Translations:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Slang Term</TableHead>
                    <TableHead>Definition</TableHead>
                    <TableHead>Generation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(result.slang_translations).map(([slang, info]) => (
                    <TableRow key={slang}>
                      <TableCell className="font-medium">{slang}</TableCell>
                      <TableCell>{info.definition}</TableCell>
                      <TableCell>{info.generation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultDisplay;