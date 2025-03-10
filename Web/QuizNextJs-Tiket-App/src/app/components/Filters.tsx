import { FaSearch } from "react-icons/fa";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  "All", 
  "Teater", 
  "Festival", 
  "Pameran", 
  "Konser", 
  "Eksibisi", 
  "Seminar",
  "Konferensi",
  "Workshop"
];

export default function Filters({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }: FiltersProps) {
  return (
    <div>
      <div className="relative w-full max-w-lg mx-auto mt-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-full py-2 px-10 w-full shadow-md focus:outline-none"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
      </div>

      <div className="flex flex-wrap gap-4 mt-6 mx-6">
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${selectedCategory === category ? "app_primary text-white" : "border"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}