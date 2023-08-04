export const truncateText = (text: string): string => {
  // Truncate the text and show an ellipsis
  return text.length > 100 ? `${text.slice(0, 100)}...` : text;
};
