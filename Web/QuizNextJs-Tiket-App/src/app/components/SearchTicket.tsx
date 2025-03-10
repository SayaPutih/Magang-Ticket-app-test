"use client";

import { useState } from "react";

interface Ticket {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
}


export default function SearchTicket() {
  const [bookedTicketId, setBookedTicketId] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!bookedTicketId) {
        alert("⚠ Please enter a ticket ID.");
        return;
    }

    try {
        const response = await fetch(
        `http://localhost:5048/api/v1/book-ticket/get-booked-ticket/${bookedTicketId}`
        );

        if (!response.ok) throw new Error("❌ Ticket not found.");

        const data = await response.json();
        console.log("🎟 API Response:", data); 

        if (!data || data.length === 0 || !data[0]?.tickets?.length) {
        throw new Error("❌ Ticket not found.");
        }

        const foundTicket = data[0].tickets[0];

        if (!foundTicket) {
        throw new Error("❌ Ticket data is empty.");
        }

        setTicket(foundTicket);
        setError("");
    } catch (err) {
        console.error(err);
        setError("❌ Ticket not found.");
        setTicket(null);
    }
    };



  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Search Ticket</h2>

      <input
        type="text"
        placeholder="Enter booked ticket ID"
        value={bookedTicketId}
        onChange={(e) => setBookedTicketId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {ticket && (
        <div className="mt-6 border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{ticket.ticketName}</h3>
            <p><strong>Ticket Code:</strong> {ticket.ticketCode}</p>
            <p><strong>Event Date:</strong> {ticket.eventDate ? new Date(ticket.eventDate).toLocaleString() : "N/A"}</p>
            <p><strong>Total Seats:</strong> {ticket.quantity ?? "N/A"}</p>
        </div>
        )}


    </div>
  );
}
