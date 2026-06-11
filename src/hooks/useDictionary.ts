import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import dictionaryData from '../data/words.json';

export interface DictionaryEntry {
  hanzi: string;
  traditional: string;
  pinyin: string;
  meaning: string;
  categories: string[];
}

const useDictionary = () => {
  const [entries] = useState<DictionaryEntry[]>(dictionaryData);
  const [fuse, setFuse] = useState<Fuse<DictionaryEntry> | null>(null);

  useEffect(() => {
    setFuse(new Fuse(entries, {
      keys: ['hanzi', 'traditional', 'pinyin', 'meaning'],
      includeScore: true,
      threshold: 0.3,
    }));
  }, [entries]);

  return { entries, fuse };
};

export default useDictionary;
