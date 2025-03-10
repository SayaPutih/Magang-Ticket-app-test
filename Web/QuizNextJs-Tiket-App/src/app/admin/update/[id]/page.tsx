"use client";

import { useParams } from "next/navigation";
import UpdateTicketForm from "../../../components/UpdateTicketForm";

export default function UpdateTicketPage() {
  const { id } = useParams(); 

  if (!id) return <p>Loading...</p>; 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Tiket</h1>
      <UpdateTicketForm ticketId={Number(id)} />
    </div>
  );
}