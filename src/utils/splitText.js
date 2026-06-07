/**
 * splitText.js
 * Manual text-splitting utility — fallback for GSAP SplitText (premium plugin).
 * Wraps text content in <span> elements so GSAP can target individual words / chars.
 */

/**
 * Split the text content of a DOM element into individually wrapped spans.
 *
 * @param {HTMLElement} element  – The DOM element whose textContent will be split.
 * @param {string}      type    – 'words' | 'chars' | 'both'
 * @returns {{ words: HTMLElement[], chars: HTMLElement[] }}
 */
export function splitTextIntoSpans(element, type = 'words') {
  if (!element) return { words: [], chars: [] };

  const text = element.textContent;
  const wordStrings = text.split(/\s+/).filter(Boolean);

  const words = [];
  const chars = [];

  // Clear original content
  element.innerHTML = '';
  element.style.display = 'inline'; // ensure spans don't collapse

  wordStrings.forEach((word, wordIndex) => {
    if (type === 'chars' || type === 'both') {
      // Create a word wrapper that holds individual char spans
      const wordWrapper = document.createElement('span');
      wordWrapper.className = 'split-word';
      wordWrapper.style.display = 'inline-block';
      wordWrapper.style.whiteSpace = 'nowrap';

      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.style.display = 'inline-block';
        charSpan.textContent = char;
        wordWrapper.appendChild(charSpan);
        chars.push(charSpan);
      });

      element.appendChild(wordWrapper);
      words.push(wordWrapper);
    } else {
      // type === 'words'
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.textContent = word;
      element.appendChild(wordSpan);
      words.push(wordSpan);
    }

    // Add a space between words (except after the last word)
    if (wordIndex < wordStrings.length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      space.style.display = 'inline-block';
      space.style.width = '0.3em';
      element.appendChild(space);
    }
  });

  return { words, chars };
}

/**
 * Revert a previously split element back to plain text.
 *
 * @param {HTMLElement} element
 * @param {string}      originalText
 */
export function revertSplit(element, originalText) {
  if (!element) return;
  element.innerHTML = '';
  element.textContent = originalText;
}
