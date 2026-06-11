import { useState } from 'react';
import { DictionaryEntry } from '../hooks/useDictionary';
import HanziStroke from './HanziStroke';

// Define the props for the component
interface WordDetailProps {
  entry: DictionaryEntry;
}

// Helper to get color class based on pinyin tone
const getToneColor = (tone: number): string => {
  switch (tone) {
    case 1: return 'text-red-500';
    case 2: return 'text-orange-500';
    case 3: return 'text-green-500';
    case 4: return 'text-purple-500';
    default: return 'text-gray-500';
  }
};

// Component to render pinyin with tone colors
const PinyinWithTones = ({ pinyin, pinyinNumbered }: { pinyin: string; pinyinNumbered: string }) => {
    const syllables = pinyin.split(' ');
    const numberedSyllables = pinyinNumbered.split(' ');

    return (
        <span className="flex items-center gap-1 flex-wrap">
            {syllables.map((syllable, index) => {
                const match = numberedSyllables[index]?.match(/(\d)$/);
                const tone = match ? parseInt(match[1], 10) : 5;
                return (
                    <span key={index} className={getToneColor(tone)}>
                        {syllable}
                    </span>
                );
            })}
        </span>
    );
};


const WordDetail = ({ entry }: WordDetailProps) => {
  const [activeTab, setActiveTab] = useState<'definition' | 'strokes' | 'traditional'>('definition');

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // TODO: Show a small "Copied!" notification
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleAddToFlashcard = () => {
    const flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    // Avoid duplicates
    if (!flashcards.some((card: DictionaryEntry) => card.id === entry.id)) {
      flashcards.push(entry);
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
      // TODO: Show a notification "Added to flashcards"
      console.log('Added to flashcards:', entry.simplified);
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
      <div className="flex justify-between items-start gap-4">
        <div>
            <h2 className="text-4xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-3">
                {entry.simplified}
                <button onClick={() => handleCopyToClipboard(entry.simplified)} title="Copy Character" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">📋</button>
            </h2>
            <div className="flex items-center gap-2 mt-1">
                <PinyinWithTones pinyin={entry.pinyin} pinyinNumbered={entry.pinyinNumbered} />
                <button onClick={() => handleCopyToClipboard(entry.pinyin)} title="Copy Pinyin" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm">📋</button>
            </div>
        </div>
        <button
            onClick={handleAddToFlashcard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
        >
            Add to Flashcard
        </button>
      </div>

      <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('definition')}
            className={`${activeTab === 'definition' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
          >
            Definition
          </button>
          <button
            onClick={() => setActiveTab('strokes')}
            className={`${activeTab === 'strokes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
          >
            Strokes
          </button>
          {entry.traditional !== entry.simplified && (
             <button
                onClick={() => setActiveTab('traditional')}
                className={`${activeTab === 'traditional' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
             >
                Traditional
             </button>
          )}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'definition' && (
          <div>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Meanings</h3>
                <button onClick={() => handleCopyToClipboard(entry.meanings.join('; '))} title="Copy Meanings" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm">📋</button>
            </div>
            <ul className="mt-2 list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-1">
                {entry.meanings.map((meaning, index) => <li key={index}>{meaning}</li>)}
            </ul>
             {entry.classifiers && entry.classifiers.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Classifiers:</h4>
                    <p className="text-gray-600 dark:text-gray-300">{entry.classifiers.join(', ')}</p>
                </div>
            )}
          </div>
        )}

        {activeTab === 'strokes' && (
           <div className="flex flex-col items-center">
             <HanziStroke character={entry.simplified} />
           </div>
        )}

        {activeTab === 'traditional' && (
            <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traditional Form</h3>
                 <p className="text-3xl font-serif mt-2 text-gray-800 dark:text-gray-100">{entry.traditional}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default WordDetail;
