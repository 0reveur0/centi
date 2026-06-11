import { DictionaryEntry } from "../hooks/useDictionary";
import HanziStroke from "./HanziStroke";

interface WordDetailProps {
  entry: DictionaryEntry;
}

const WordDetail = ({ entry }: WordDetailProps) => {
  if (!entry) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <p>Select a word to see details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="font-hanzi text-5xl font-bold text-gray-900 dark:text-white">{entry.simplified}</h1>
        {entry.traditional && (
          <p className="text-lg text-gray-500 dark:text-gray-400">Traditional: {entry.traditional}</p>
        )}
        <p className="text-2xl text-blue-500 dark:text-blue-400 mt-2">{entry.pinyin}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Meanings</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {entry.meanings.map((meaning, index) => (
            <li key={index}>{meaning}</li>
          ))}
        </ul>
      </div>

      {entry.simplified.length === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">Stroke Order</h2>
          <HanziStroke character={entry.simplified} />
        </div>
      )}
    </div>
  );
};

export default WordDetail;
