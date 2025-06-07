import { useState } from 'react';

export default function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);

  // Fix the image path to point to public folder
  const imageUrl = book.imageLink ? `/images/${book.imageLink.split('/').pop()}` : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={`Cover of ${book.title}`}
              className="w-16 h-24 object-cover rounded shadow-sm"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-16 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded shadow-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <span>{book.year}</span>
            <span>•</span>
            <span>{book.pages} pages</span>
            <span>•</span>
            <span>{book.language}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {book.country}
            </span>
            
            {book.link && (
              <a 
                href={book.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Wikipedia
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
