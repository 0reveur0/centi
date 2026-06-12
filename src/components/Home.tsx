import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  return (
    <div className="container mx-auto px-4 text-center py-16">
      <img src="/logo.svg" alt="WenZi Logo" className="h-24 w-auto mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-primary mb-2">WenZi</h1>
      <p className="text-lg text-gray-600 mb-8">The smart Chinese dictionary for Vietnamese learners.</p>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a word..."
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-primary focus:border-primary transition-shadow shadow-sm hover:shadow-md"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
