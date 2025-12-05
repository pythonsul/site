/**
 * Fun Console Easter Egg: Friendly message with a hint to the repository.
 */
const DEFAULT_REPO_URL = 'https://github.com/pythonsul/python-sul-site';
const repositoryElement = document.getElementById('repository-url');
const repositoryUrl = repositoryElement?.getAttribute('href') || DEFAULT_REPO_URL;

const lines = [
  'You appear to be searching for the source code.',
  'While this is not the optimal location,',
  `Captain Picard has provided the correct coordinates: ${repositoryUrl}`
];

// Calculate the max line length for proper border padding
const maxLineLength = Math.max(...lines.map(line => line.length));
const padding = 8; // For "# > " and " #"
const contentWidth = maxLineLength + padding;

const border = '#'.repeat(contentWidth);
const emptyLine = `#${' '.repeat(contentWidth - 2)}#`;

// Format each line with proper padding
const formattedLines = lines.map(line => {
  const spacePadding = contentWidth - 5 - line.length; // 4 for "# > " and " #"
  return `# > ${line}${' '.repeat(spacePadding)}#`;
});

const finalMessage = [
  border,
  emptyLine,
  ...formattedLines,
  emptyLine,
  border
].join('\n');

// Styled console output
console.log(`%c${finalMessage}`, 'color: green; font-size: 1rem; font-family: monospace;');
