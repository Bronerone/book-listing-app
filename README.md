# Book Listing Application

A responsive web application to display and filter a list of the 100 best books using Next.js.

## Technologies Used

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Language:** JavaScript
- **Data Source:** https://github.com/benoitvallon/100-best-books/blob/master/books.json

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:3000

## Project Structure

```
src/app/
├── BookCard.js      # Individual book display
├── FilterPanel.js   # Filter controls
├── Pagination.js    # Page navigation
├── bookData.js      # Data fetching
└── page.js          # Main component
```

## Data Source

Books fetched from: https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json
```

## Pseudo Code

### Main Application Logic

**Initialize App Component:**
- STATE books = []
- STATE filteredBooks = []
- STATE currentPage = 1
- STATE searchTerm = ""
- STATE filters = { country: "", language: "", pageRange: "", century: "" }

**On Component Mount:**
- CALL fetchBooks()

**fetchBooks() Function:**
- TRY: FETCH data from API endpoint
- SET books = response data
- SET filteredBooks = books
- CATCH: Handle errors

**handleSearch(searchValue) Function:**
- SET searchTerm = searchValue
- CALL applyFiltersAndSearch()

**handleFilterChange(newFilters) Function:**
- SET filters = newFilters
- CALL applyFiltersAndSearch()

**applyFiltersAndSearch() Function:**
- START with result = books
- IF searchTerm NOT empty: FILTER by title OR author
- IF filters.country NOT empty: FILTER by country
- IF filters.language NOT empty: FILTER by language
- IF filters.pageRange NOT empty: FILTER by page range
- IF filters.century NOT empty: FILTER by century
- SET filteredBooks = result
- SET currentPage = 1

**handlePageChange(page) Function:**
- SET currentPage = page

**getPaginatedBooks() Function:**
- CALCULATE startIndex = (currentPage - 1) * 20
- CALCULATE endIndex = startIndex + 20
- RETURN filteredBooks.slice(startIndex, endIndex)

### Component Structure

**BookCard Component:**
- PROPS: book object
- STATE: imageError = false
- RENDER: Card with image, title, author, details, country badge, Wikipedia link

**FilterPanel Component:**
- PROPS: books, filters, onFilterChange
- COMPUTE: unique countries and languages from books
- RENDER: Dropdown selects for country, language, page range, century

**Pagination Component:**
- PROPS: currentPage, totalPages, onPageChange, totalItems
- COMPUTE: startItem and endItem for display
- RENDER: Previous/Next buttons and page info

### Data Flow
User Input → State Update → Filter Logic → Re-render Components
```