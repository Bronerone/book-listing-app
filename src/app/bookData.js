export async function fetchBooks() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json');
    const books = await response.json();
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export function getUniqueValues(books, key) {
  return [...new Set(books.map(book => book[key]))].sort();
}

export function getCenturyFromYear(year) {
  return Math.ceil(year / 100);
}

export function getPageRange(pages) {
  if (pages <= 100) return '1-100';
  if (pages <= 200) return '101-200';
  if (pages <= 300) return '201-300';
  if (pages <= 400) return '301-400';
  if (pages <= 500) return '401-500';
  return '500+';
}
