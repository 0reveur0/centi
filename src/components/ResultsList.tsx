import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DictionaryEntry } from '../hooks/useDictionary';

interface ResultsListProps {
  results: DictionaryEntry[];
  onSelect: (entry: DictionaryEntry) => void;
  selectedEntry: DictionaryEntry | null;
}

const ResultsList = ({ results, onSelect, selectedEntry }: ResultsListProps) => {
  if (!results.length) {
    return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <p>No results found.</p>
        </div>
    );
  }

  // Row component for the list
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const entry = results[index];
    const isSelected = selectedEntry?.id === entry.id;
    return (
      <div style={style}>
        <div 
            onClick={() => onSelect(entry)}
            className={`cursor-pointer p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
          <div className="font-bold text-lg text-gray-900 dark:text-white">{entry.simplified}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{entry.pinyin}</div>
          <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{entry.meanings.join(', ')}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-96 bg-white dark:bg-gray-800 rounded-lg shadow-inner overflow-hidden">
        <AutoSizer>
            {({ height, width }) => (
                <List
                    height={height}
                    itemCount={results.length}
                    itemSize={90} // Adjust based on your row height
                    width={width}
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    </div>
  );
};

export default ResultsList;
