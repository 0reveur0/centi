import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { WordEntry } from '../types';

export function useSearch(words: WordEntry[], query: string) {
  const fuse = useMemo(
    () =>
      new Fuse(words, {
        keys: ['hanzi', 'traditional', 'pinyin', 'meaning', 'categories'],
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: true
      }),
    [words]
  );

  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    return fuse.search(trimmed).map((result) => result.item);
  }, [fuse, query]);
}
