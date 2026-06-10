import type { WordEntry } from '../types';

interface WordCardProps {
  word: WordEntry;
  onSelect: (word: WordEntry) => void;
}

export default function WordCard({ word, onSelect }: WordCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(word)}
      className="group w-full rounded-3xl border border-slate-800 bg-slate-900/95 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-white">{word.hanzi}</p>
          {word.traditional && word.traditional !== word.hanzi ? (
            <p className="mt-1 text-sm text-slate-400">Giản/Phồn: {word.traditional}</p>
          ) : null}
        </div>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-300">
          {word.categories?.[0] ?? 'Từ vựng'}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{word.pinyin} · {word.meaning}</p>
    </button>
  );
}
