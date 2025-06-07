'use client';

export default function FilterPanel({ books, filters, onFilterChange }) {
  const countries = [...new Set(books.map(book => book.country))].sort();
  const languages = [...new Set(books.map(book => book.language))].sort();

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white cursor-pointer"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white cursor-pointer"
          >
            <option value="">All Languages</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>

        {/* Page Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Count
          </label>
          <select
            value={filters.pageRange}
            onChange={(e) => handleFilterChange('pageRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white cursor-pointer"
          >
            <option value="">Any Length</option>
            <option value="1-200">Short (1-200 pages)</option>
            <option value="201-400">Medium (201-400 pages)</option>
            <option value="401-600">Long (401-600 pages)</option>
            <option value="600+">Very Long (600+ pages)</option>
          </select>
        </div>

        {/* Clear Filters */}
        {Object.values(filters).some(Boolean) && (
          <button
            onClick={() => onFilterChange({ country: '', language: '', pageRange: '', century: '' })}
            className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
