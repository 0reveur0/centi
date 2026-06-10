import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WordCard from './components/WordCard';
import WordDetail from './components/WordDetail';
import { useSearch } from './hooks/useSearch';
import words from './data/words.json';
import type { WordEntry } from './types';

function App() {
  const [query, setQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const results = useSearch(words, query);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_30%),_radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.08),_transparent_30%),_linear-gradient(180deg,#020617_0%,#0f172a_100%)] py-10 px-4 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-card backdrop-blur-xl">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
              <Sparkles className="h-4 w-4" /> MVP Centi
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Centi — Từ điển Trung-Việt tĩnh.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Tìm kiếm nhanh Hanzi, Pinyin và nghĩa tiếng Việt. Dễ dùng, responsive, và deploy được trên GitHub Pages.
            </p>
          </div>

          <div className="mt-10">
            <SearchBar query={query} onQueryChange={setQuery} />
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Kết quả tìm kiếm</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Nhập từ cần tìm và chọn một mục để xem chi tiết.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                {query.trim() ? `${results.length} kết quả` : 'Nhập tìm kiếm...'}
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {query.trim() ? (
                results.length > 0 ? (
                  results.map((word) => (
                    <WordCard key={`${word.hanzi}-${word.pinyin}`} word={word} onSelect={setSelectedWord} />
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
                    Không tìm thấy kết quả phù hợp. Hãy thử đổi cách viết Hanzi, Pinyin hoặc nghĩa.
                  </div>
                )
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
                  Chưa có truy vấn. Nhập Hanzi, Pinyin hoặc nghĩa tiếng Việt để bắt đầu tìm kiếm.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-white">Gợi ý</h2>
            <p className="mt-4 text-slate-300 leading-7">
              Dự án hiện dùng file JSON tĩnh và Fuse.js để tìm kiếm fuzzy. Mỗi từ có thể hiển thị dạng giản/ phồn, pinyin tone và nghĩa tiếng Việt.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Ví dụ tìm</p>
                <p className="mt-3 text-lg">你好, xue, bạn bè, cảm ơn</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Responsive</p>
                <p className="mt-3 text-lg">Giao diện tối ưu cho desktop và mobile.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {selectedWord ? <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} /> : null}
    </div>
  );
}

export default App;
