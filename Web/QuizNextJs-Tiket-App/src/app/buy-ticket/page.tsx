"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BuyTicketForm from "../components/BuyTicketForm"; // Perbaiki path import

interface Ticket {
  id: number;
  kodeTiket: string;
  namaTiket: string;
  harga: number;
  tanggalEvent: string;
  sisaQuota: number;
}

export default function BuyTicketPage() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("🔍 Debug: ticketId dari URL →", ticketId);

  useEffect(() => {
    if (!ticketId) {
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:5048/api/v1/tikets/get-ticket/${ticketId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Ticket = await response.json();
        console.log("✅ Data tiket:", data);
        setTicket(data);
      } catch (error) {
        console.error("🚨 Error fetching ticket details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!ticketId) return <p className="text-red-500">⚠ Ticket ID tidak ditemukan!</p>;
  if (loading) return <p>Loading ticket details...</p>;
  if (!ticket) return <p className="text-red-500">🚨 Error: Ticket tidak ditemukan!</p>;

  return <BuyTicketForm ticket={ticket} />;
}
