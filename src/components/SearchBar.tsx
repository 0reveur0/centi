import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-3xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Tìm theo Hanzi, Pinyin hoặc nghĩa tiếng Việt..."
        className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-14 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}
