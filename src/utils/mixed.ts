import frontMatter from 'front-matter';
import removeMd from 'remove-markdown';

export function getMarkdownExcerpt(markdown: string, maxExcerptLength = 70) {
  const parsedMarkdown = frontMatter(markdown);
  let contentText = removeMd(parsedMarkdown.body);
  // Trim and normalize whitespace in content text
  contentText = contentText.trim().replace(/\s+/g, ' ');
  const excerpt = contentText.slice(0, maxExcerptLength);

  if (contentText.length > maxExcerptLength) {
    return excerpt + '...';
  }

  return excerpt;
}
