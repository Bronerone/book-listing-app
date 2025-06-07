export function filterBooks(books, filters) {
  return books.filter(book => {
    // Country filter
    if (filters.country && book.country !== filters.country) {
      return false;
    }

    // Language filter
    if (filters.language && book.language !== filters.language) {
      return false;
    }

    // Page range filter
    if (filters.pageRange) {
      const bookPageRange = getPageRange(book.pages);
      if (bookPageRange !== filters.pageRange) {
        return false;
      }
    }

    // Century filter
    if (filters.century) {
      const bookCentury = getCenturyFromYear(book.year);
      if (bookCentury !== parseInt(filters.century)) {
        return false;
      }
    }

    return true;
  });
}

export function searchBooks(books, searchTerm) {
  if (!searchTerm) return books;
  
  const term = searchTerm.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term) ||
    book.country.toLowerCase().includes(term) ||
    book.language.toLowerCase().includes(term)
  );
}

function getPageRange(pages) {
  if (pages <= 100) return '1-100';
  if (pages <= 200) return '101-200';
  if (pages <= 300) return '201-300';
  if (pages <= 400) return '301-400';
  if (pages <= 500) return '401-500';
  return '500+';
}

function getCenturyFromYear(year) {
  return Math.ceil(year / 100);
}
