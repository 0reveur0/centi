import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import useDictionary, { DictionaryEntry } from './hooks/useDictionary';
import WordDetail from './components/WordDetail';
import { useLanguage } from './contexts/LanguageContext';
import WordCard from './components/WordCard';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

const SearchResults = ({ entries, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {entries.map(entry => (
        <WordCard key={entry.hanzi} entry={entry} onSelect={onSelect} />
      ))}
    </div>
  );
};

const SearchPage = () => {
  const { fuse } = useDictionary();
  const navigate = useNavigate();
  const { q } = useParams();
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  useEffect(() => {
    if (fuse && q) {
      const results = fuse.search(q).map(result => result.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    setSelectedEntry(null);
  }, [fuse, q]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {searchResults.length > 0 ? (
        <SearchResults entries={searchResults} onSelect={setSelectedEntry} />
      ) : (
        <div className="text-center py-16">
            <img src="/logo.svg" alt="WenZi Logo" className="h-24 w-auto mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-600">Sorry, we couldn't find any results for "{q}".</p>
        </div>
      )}
      {selectedEntry && 
        <WordDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      }
    </main>
  );
};


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:q" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
