'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import FilterPanel from './FilterPanel';
import BookList from './BookList';
import Pagination from './Pagination';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    language: '',
    pageRange: '',
    century: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter and search books
  const filteredBooks = useMemo(() => {
    let result = books;

    // Search
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filters
    if (filters.country) {
      result = result.filter(book => book.country === filters.country);
    }
    if (filters.language) {
      result = result.filter(book => book.language === filters.language);
    }
    if (filters.pageRange) {
      result = result.filter(book => {
        const pages = book.pages;
        switch (filters.pageRange) {
          case '1-200': return pages <= 200;
          case '201-400': return pages > 200 && pages <= 400;
          case '401-600': return pages > 400 && pages <= 600;
          case '600+': return pages > 600;
          default: return true;
        }
      });
    }

    return result;
  }, [books, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchTerm}
        totalBooks={books.length}
        filteredCount={filteredBooks.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <FilterPanel 
              books={books}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <BookList books={paginatedBooks} loading={loading} />
            
            {!loading && filteredBooks.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredBooks.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
