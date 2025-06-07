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

And here's the **Pseudo Code** for bonus points:

```javascript:PSEUDOCODE.md
# Book Listing Application - Pseudo Code

## Main Application Logic

```
INITIALIZE App Component:
  STATE books = []
  STATE filteredBooks = []
  STATE currentPage = 1
  STATE searchTerm = ""
  STATE filters = {
    country: "",
    language: "", 
    pageRange: "",
    century: ""
  }

ON Component Mount:
  CALL fetchBooks()

FUNCTION fetchBooks():
  TRY:
    response = FETCH("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json")
    data = AWAIT response.json()
    SET books = data
    SET filteredBooks = data
  CATCH error:
    CONSOLE.LOG("Error fetching books")
    SET books = []

FUNCTION handleSearch(searchValue):
  SET searchTerm = searchValue
  CALL applyFiltersAndSearch()

FUNCTION handleFilterChange(newFilters):
  SET filters = newFilters
  CALL applyFiltersAndSearch()

FUNCTION applyFiltersAndSearch():
  result = books
  
  // Apply search
  IF searchTerm NOT empty:
    result = FILTER result WHERE (
      title CONTAINS searchTerm OR 
      author CONTAINS searchTerm
    )
  
  // Apply filters
  IF filters.country NOT empty:
    result = FILTER result WHERE country EQUALS filters.country
  
  IF filters.language NOT empty:
    result = FILTER result WHERE language EQUALS filters.language
  
  IF filters.pageRange NOT empty:
    result = FILTER result WHERE pages IN selected range
  
  IF filters.century NOT empty:
    result = FILTER result WHERE year IN selected century
  
  SET filteredBooks = result
  SET currentPage = 1

FUNCTION handlePageChange(page):
  SET currentPage = page

FUNCTION getPaginatedBooks():
  startIndex = (currentPage - 1) * 20
  endIndex = startIndex + 20
  RETURN filteredBooks.slice(startIndex, endIndex)

RENDER:
  <Header with search input>
  <FilterPanel with dropdowns>
  <BookList with getPaginatedBooks()>
  <Pagination controls>
```

## Component Pseudo Code

### BookCard Component:
```
PROPS: book object
STATE: imageError = false

RENDER:
  <Card container>
    IF book.imageLink AND NOT imageError:
      <Image with onError handler>
    ELSE:
      <Placeholder icon>
    
    <Book details: title, author, year, pages, language>
    <Country badge>
    <Wikipedia link IF book.link exists>
```

### FilterPanel Component:
```
PROPS: books, filters, onFilterChange

COMPUTE:
  countries = UNIQUE values from books.country
  languages = UNIQUE values from books.language

RENDER:
  <Country dropdown>
  <Language dropdown>  
  <Page range dropdown>
  <Century dropdown>
  <Clear filters button>
```

### Pagination Component:
```
PROPS: currentPage, totalPages, onPageChange, totalItems

COMPUTE:
  startItem = (currentPage - 1) * 20 + 1
  endItem = MIN(currentPage * 20, totalItems)

RENDER:
  <Items count display>
  <Previous button>
  <Page info>
  <Next button>
```

## Data Flow:
```
User Input → State Update → Filter Logic → Re-render Components
```
```

Now commit both files:

```bash
git add README.md PSEUDOCODE.md
git commit -m "Add README and pseudo code documentation"
git push origin main
