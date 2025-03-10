import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Ticket {
  id: number;
  namaKategori: string;
  kodeTiket: string;
  namaTiket: string;
  tanggalEvent: string;
  harga: number;
  sisaQuota: number;
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

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch("http://localhost:5048/api/v1/tikets/get-all-available-tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    router.replace(`/categories?category=${selectedCategory}`);
  }, [selectedCategory]);

  const filteredTickets = tickets.filter(ticket => 
    (selectedCategory === "All" || ticket.namaKategori === selectedCategory) &&
    ticket.namaTiket.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="mt-6 mx-6">
        {filteredTickets.length > 0 ? (
          <ul>
            {filteredTickets.map(ticket => (
              <li key={ticket.id} className="border p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{ticket.namaTiket}</h2>
                    <p className="text-gray-600">{new Date(ticket.tanggalEvent).toLocaleString()}</p>
                    <p className="text-gray-600">Price: Rp{ticket.harga}</p>
                    <p className="text-gray-600">Quota: {ticket.sisaQuota}</p>
                  </div>
                  <div> 
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => router.push(`/buy-ticket?page&id=${ticket.id}`)}
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              </li>
              
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tickets found.</p>
        )}
      </div>
    </div>
  );
}
