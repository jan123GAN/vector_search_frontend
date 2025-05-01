import React, { useState } from 'react';
import { searchDocuments, addDocument } from '@/lib/api';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await searchDocuments(searchQuery);
  
      
      if (!response || !response.results || response.results.length === 0) {
        setError('No matching documents found. Try different keywords or add new documents.');
        setResults([]);
      } else {
        setResults(response.results);
        setError(null);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required');
      setSuccessMessage(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await addDocument(title, content);
      e.target.reset();
      setError(null);
      setSuccessMessage('Document added successfully!');
    } catch (err) {
      setError('Failed to add document: ' + err.message);
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
          Vector Search Engine
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-2xl">
          Upload documents and search through them using vector similarity
        </p>

        {/* Upload Form */}
        <form onSubmit={handleDocumentUpload} className="w-full max-w-lg space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Document title"
            className="w-full h-12 px-4 rounded-lg border border-border bg-muted/50"
            disabled={isLoading}
            required
          />
          <textarea
            name="content"
            placeholder="Document content"
            className="w-full h-32 px-4 py-2 rounded-lg border border-border bg-muted/50"
            disabled={isLoading}
            required
          />
          <button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding Document..." : "Add Document"}
          </button>
        </form>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full h-12 px-4 pr-12 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <div className="w-full max-w-4xl mt-8">
            <h2 className="text-xl font-semibold mb-4">Search Results ({results.length})</h2>
            <div className="space-y-4">
              {results.map((doc) => (
                <div key={doc._id} className="p-4 rounded-lg border border-border bg-muted/30">
                  <h3 className="font-medium mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.content}</p>
                  <div className="text-xs text-muted-foreground mt-2">

                    Similarity: {(doc.score * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}