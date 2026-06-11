import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { DictionaryEntry } from './useDictionary';

export type SearchFilter = 'all' | 'simplified' | 'traditional';

// Custom hook to perform a search on the dictionary
const useSearch = (
    entries: DictionaryEntry[], 
    query: string, 
    filter: SearchFilter = 'all'
) => {
  const fuse = useMemo(() => {
    const options: Fuse.IFuseOptions<DictionaryEntry> = {
      keys: [
        { name: 'simplified', weight: 4 }, // Highest weight
        { name: 'traditional', weight: 3 },
        { name: 'pinyin', weight: 2 },
        { name: 'pinyinNumbered', weight: 1.5 },
        { name: 'meanings', weight: 1 }, // Lowest weight for broad matching
      ],
      includeScore: true,
      threshold: 0.35, // Slightly increased for more flexibility
      // ignoreLocation: true, // Match anywhere in the string
      useExtendedSearch: true, // Allows for more complex queries, e.g., using ' for exact match
    };
    return new Fuse(entries, options);
  }, [entries]);

  return useMemo(() => {
    if (!query) {
      return [];
    }

    // The query is split into words to allow more flexible matching. 
    // For example, "ni hao" should match "nǐ hǎo".
    const searchResults = fuse.search(query.trim());

    const filteredResults = searchResults.map(result => result.item).filter(item => {
        if (filter === 'simplified') {
            return item.simplified === item.traditional;
        }
        if (filter === 'traditional') {
            return item.simplified !== item.traditional;
        }
        return true;
    });

    return filteredResults;

  }, [fuse, query, filter]);
};

export default useSearch;
