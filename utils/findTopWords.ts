/**
 * Get most popular words in sentence
 * @param sentence
 * @param size
 */
export function findTopWords(sentence: string, size: number) {
  if (!sentence) {
    return []
  }

  // Remove non-word characters (this probably isn't a perfect set of characters)
  const sanitized = sentence.replace(/[^A-Z0-9- \n]/gmi, '')

  const words = sanitized
    // Split into words by space or new line
    .split(/[ \n]/gmi)
    // Normalize to lowercase and remove double spaces
    .map(word => word.toLowerCase().trim())
    // Remove items that don't contain any letters
    .filter(Boolean);

  // Get a unique list of words
  const unique = getUniqueWords(words);

  // Calculate the amount of times the words appear in the array
  const items = unique.map(word => {
    const count = words.filter(w => w === word).length;

    return {
      word,
      count
    }
  });

  // Sort by `count`, then by `word`
  items.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }

    if (a.count < b.count) {
      return 1;
    }

    if (a.word > b.word) {
      return 1;
    }

    if (a.word < b.word) {
      return -1;
    }

    return 0;
  })

  // Take the top n items
  return items.slice(0, size);
}

/**
 * I'd typically use lodash.uniq for this, but
 * I'll avoid libraries where I can here.
 */
export function getUniqueWords(words: string[]): string[] {
  return Array.from(new Set(words))
}
