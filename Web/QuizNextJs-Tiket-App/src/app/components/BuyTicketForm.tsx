"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emailjs from "emailjs-com";
import placeholderImg from "../../img/Placeholder.png";

interface Ticket {
  id : number;
  kodeTiket: string;
  namaTiket: string;
  harga: number;
  tanggalEvent: string;
  sisaQuota: number;
}

export default function BuyTicketForm({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");

  const handleBuy = async () => {
    if (!email) {
      alert("⚠ Please enter your email.");
      return;
    }
    if (quantity < 1 || quantity > ticket.sisaQuota) {
      alert(`⚠ Quantity must be between 1 and ${ticket.sisaQuota}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5048/api/v1/book-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tickets: [{ kodeTiket: ticket.kodeTiket, quantity }],
        }),
      });

      
      const data = await response.json();
      console.log("📩 Response API:", data);

      if (!response.ok) throw new Error("❌ Failed to book ticket");

      const templateParams = {
        idTiket : ticket.id ,
        kodeTiket: ticket.kodeTiket, 
        namaTiket: ticket.namaTiket,
        tanggalEvent: new Date(ticket.tanggalEvent).toLocaleString(),
        quantity: quantity,
        harga: ticket.harga.toLocaleString(),
        user_email: email, 
      };

      await emailjs.send(
        "service_t590qae",
        "template_lgm1p7b",
        templateParams,
        "SA5blM0ceT9zfSkRH"
      );

      alert(`✅ Ticket successfully booked! Your ticket code: ${ticket.id}. Check your email.`);
      router.push("/categories");
    } catch (error) {
      console.error(error);
      alert("❌ Error booking ticket.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <Image src={placeholderImg} alt={ticket.namaTiket} className="w-full h-64 object-cover rounded-md" />

        <h2 className="text-2xl font-semibold mt-4">{ticket.namaTiket}</h2>
        <p className="text-gray-600">{new Date(ticket.tanggalEvent).toLocaleString()}</p>
        <p className="text-gray-700 font-medium">Price: Rp{ticket.harga.toLocaleString()}</p>
        <p className="text-gray-700">Remaining Quota: {ticket.sisaQuota}</p>

        <div className="w-full mt-4">
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={ticket.sisaQuota}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="w-full mt-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div className="w-full mt-6 flex justify-between">
          <button onClick={handleBuy} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mr-2">
            Buy
          </button>
          <button onClick={() => router.push("/categories")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
