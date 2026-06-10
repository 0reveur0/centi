import type { WordEntry } from '../types';

export function getCardDescription(word: WordEntry) {
  return `${word.pinyin} · ${word.meaning}`;
}

export function getCategoryLabel(word: WordEntry) {
  return word.categories?.join(' · ') ?? 'Không rõ';
}
