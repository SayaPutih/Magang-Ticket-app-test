"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Ticket {
  id: number;
  namaKategori: string;
  namaTiket: string;
  tanggalEvent: string;
  harga: number;
  sisaQuota: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetch("http://localhost:5048/api/v1/tikets/get-all-available-tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  };

  const handleDelete = async (ticketId: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      try {
        const response = await fetch(`http://localhost:5048/api/v1/tikets/delete-ticket/${ticketId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Ticket deleted successfully!");
          fetchTickets();
        } else {
          alert("Failed to delete ticket.");
        }
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    }
  };

  return (
    <div className="mt-6 mx-6">
      <h1 className="text-xl font-bold mb-4">Admin Ticket Management</h1>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id} className="border p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{ticket.namaTiket}</h2>
                <p className="text-gray-600">{new Date(ticket.tanggalEvent).toLocaleString()}</p>
                <p className="text-gray-600">Price: Rp{ticket.harga}</p>
                <p className="text-gray-600">Quota: {ticket.sisaQuota}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => router.push(`/admin/update/${ticket.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tickets found.</p>
      )}
    </div>
  );
}
