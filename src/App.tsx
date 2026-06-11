import { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import WordDetail from './components/WordDetail';
import useDictionary, { DictionaryEntry } from './hooks/useDictionary';
import useSearch, { SearchFilter } from './hooks/useSearch';
import useDebouncedValue from './hooks/useDebouncedValue';
import LoadingSpinner from './components/LoadingSpinner';
import { ReactComponent as Logo } from './logo.svg'; // Assuming you have a logo

function App() {
  const { entries, loading } = useDictionary();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<DictionaryEntry | null>(null);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>('all');

  const debouncedQuery = useDebouncedValue(query, 300);
  const searchResults = useSearch(entries, debouncedQuery, searchFilter);

  // Show some random/popular words when there's no query
  const initialResults = useMemo(() => {
    if (entries.length > 0) {
        // Just a simple slice for now, could be made more sophisticated
        return entries.slice(0, 15);
    }
    return [];
  }, [entries]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="flex flex-col items-center justify-center py-6 sm:py-10 px-4">
        <Logo className="w-24 h-24 mb-4 text-blue-500" />
        <h1 className="text-4xl sm:text-5xl font-bold text-center">Centi Dictionary</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 text-center">A modern Chinese-Vietnamese Dictionary.</p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="sticky top-0 z-10 py-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
             <SearchBar 
                query={query} 
                onQueryChange={setQuery} 
                filter={searchFilter} 
                onFilterChange={setSearchFilter} 
             />
        </div>

        {loading && <div className="mt-8"><LoadingSpinner /></div>}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-1">
              <ResultsList 
                results={query ? searchResults : initialResults} 
                onSelect={setSelected} 
                selectedEntry={selected}
              />
            </div>
            <div className="md:col-span-2">
              {selected && <WordDetail entry={selected} />}
              {!selected && (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <p>Search for a word or select one from the list to see details.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>Centi Dictionary</p>
        <p className="mt-1">
          Data from 
          <a href="https://github.com/makemeahanzi/makemeahanzi" className="underline hover:text-blue-500"> makemeahanzi</a> & 
          <a href="https://github.com/tatoeba/tatoeba2" className="underline hover:text-blue-500"> Tatoeba</a>.
        </p>
        <p className="mt-1">
          <a href="https://github.com/your-repo/centi" className="underline hover:text-blue-500">GitHub Repository</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
