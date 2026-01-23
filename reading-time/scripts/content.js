function renderReadingTime(article) {
  //If we weren't provided an article, we don't to render anything.
  if (!article) {
    return;
  }

  const text = article.textContent;
  const wordMatchRegExp = /[^/s]+/g; // Regular expression
  const words = text.matchAll(worldMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = match.round(wordsCount / 200);
  const badge = document.createElement("p");
  //use the same styling as the publish information in an article's header
  badge.classlist.add("color-secondary-text", "type--caption");
  badge.textContent = '⏱️ ${readingTime} min read';
  // Support for API reference docs
  const date = article.querySelector("time)?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

renderReadingTime(document.querySelector("article"));

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
      if (node instanceof Element && node.tagName === 'ARTICLE') {
        // Render the reading time for this particular article.
        renderReadingTime(node);
      }
    }
  }
});

// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
observer.observe(document.querySelector('devsite-content'), {
  childList: true
});
