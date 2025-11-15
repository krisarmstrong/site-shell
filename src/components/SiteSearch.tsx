import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  type: string;
}

interface SiteSearchProps {
  /** Searchable content array */
  searchableContent: SearchResult[];
  /** Placeholder text */
  placeholder?: string;
  /** Color variant for type badges */
  variant?: 'violet' | 'blue' | 'sage' | 'default';
  /** Custom type colors - maps type names to Tailwind classes */
  typeColors?: Record<string, string>;
  /** Max results to show */
  maxResults?: number;
}

const defaultTypeColors: Record<string, Record<string, string>> = {
  violet: {
    default: "bg-violet-500/20 text-violet-400",
  },
  blue: {
    default: "bg-blue-500/20 text-blue-400",
  },
  sage: {
    default: "bg-accent/20 text-accent",
  },
  default: {
    default: "bg-gray-500/20 text-gray-400",
  },
};

export function SiteSearch({
  searchableContent,
  placeholder = "Search...",
  variant = 'violet',
  typeColors,
  maxResults = 8,
}: SiteSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = searchableContent.filter((item) => {
      const searchText = `${item.title} ${item.excerpt}`.toLowerCase();
      return searchTerms.every((term) => searchText.includes(term));
    });

    setResults(filtered.slice(0, maxResults));
  }, [query, searchableContent, maxResults]);

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  const getTypeColor = (type: string) => {
    if (typeColors && typeColors[type]) {
      return typeColors[type];
    }
    return defaultTypeColors[variant]?.default || defaultTypeColors.default.default;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
        title="Search (Ctrl+K)"
      >
        <SearchIcon size={18} />
        <span className="hidden sm:inline text-sm">Search</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-gray-700 rounded border border-gray-600">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-4 top-20 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50">
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-800">
            <SearchIcon size={20} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full text-left p-4 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <span className={`px-2 py-0.5 text-xs rounded ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-white mb-1">{result.title}</div>
                      <div className="text-sm text-gray-400 line-clamp-2">{result.excerpt}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
