import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import img from "../../img/Placeholder.png";

interface Ticket {
  id: number;
  namaKategori: string;
  namaTiket: string;
  tanggalEvent: string;
  harga: number;
  sisaQuota: number;
}

interface TicketListProps {
  searchQuery: string;
  selectedCategory: string;
}

export default function TicketList({ searchQuery, selectedCategory }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    fetch("http://localhost:5048/api/v1/tikets/get-all-available-tickets")
      .then((response) => response.json())
      .then((data: Ticket[]) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const filteredTickets = tickets.filter(
    (ticket) =>
      (selectedCategory === "All" || ticket.namaKategori.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      ticket.namaTiket.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 mx-6">
      <h1 className="text-2xl font-bold mb-4">Available Tickets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="border rounded-lg shadow-md p-4">
            <Image src={img} alt={ticket.namaTiket} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{ticket.namaTiket}</h2>
            <p className="text-gray-600">Category: {ticket.namaKategori}</p>
            <p className="text-gray-600">Date: {new Date(ticket.tanggalEvent).toLocaleDateString()}</p>
            <p className="text-gray-600">Price: Rp{ticket.harga.toLocaleString()}</p>
            <p className="text-gray-600">Remaining Quota: {ticket.sisaQuota}</p>
            
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => router.push(`/buy-ticket?id=${ticket.id}`)}
            >
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
