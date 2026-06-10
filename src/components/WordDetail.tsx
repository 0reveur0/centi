import { X } from 'lucide-react';
import type { WordEntry } from '../types';

interface WordDetailProps {
  word: WordEntry;
  onClose: () => void;
}

export default function WordDetail({ word, onClose }: WordDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 modal-backdrop">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Chi tiết từ</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{word.hanzi}</h2>
            {word.traditional && word.traditional !== word.hanzi ? (
              <p className="mt-2 text-sm text-slate-400">Phồn thể: {word.traditional}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-slate-300 transition hover:bg-slate-800"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Pinyin</p>
            <p className="mt-3 text-lg font-medium text-white">{word.pinyin}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Nghĩa tiếng Việt</p>
            <p className="mt-3 text-lg font-medium text-white">{word.meaning}</p>
          </div>
        </div>

        {word.categories?.length ? (
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Phân loại</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {word.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
