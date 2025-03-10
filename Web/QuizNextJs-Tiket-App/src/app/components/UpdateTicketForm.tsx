"use client";

import { useState, useEffect } from "react";

export default function UpdateTicketForm({ ticketId }: { ticketId: number }) {
  const [formData, setFormData] = useState({
    namaKategori: "",
    namaTiket: "",
    tanggalEvent: "",
    harga: "",
    sisaQuota: "",
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log(`Fetching: http://localhost:5048/api/v1/tikets/get-ticket/${ticketId}`);

        const response = await fetch(`http://localhost:5048/api/v1/tikets/get-ticket/${ticketId}`);

        if (!response.ok) {
          console.error(`Error ${response.status}: ${response.statusText}`);
          return;
        }

        const text = await response.text();
        if (!text) {
          console.warn("API returned an empty response.");
          return;
        }

        const data = JSON.parse(text);
        console.log("Fetched data:", data);

        setFormData({
          ...data,
          tanggalEvent: data.tanggalEvent ? new Date(data.tanggalEvent).toISOString().slice(0, 16) : "",
        });

      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    if (ticketId) fetchTicket();
  }, [ticketId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        tanggalEvent: new Date(formData.tanggalEvent).toISOString(),
      };

      const response = await fetch(`http://localhost:5048/api/v1/tikets/update-ticket/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Gagal update tiket");
      alert("Tiket berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update tiket.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block font-medium">Nama Kategori</label>
        <input type="text" name="namaKategori" value={formData.namaKategori} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Nama Tiket</label>
        <input type="text" name="namaTiket" value={formData.namaTiket} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Tanggal Event</label>
        <input type="datetime-local" name="tanggalEvent" value={formData.tanggalEvent} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Harga</label>
        <input type="number" name="harga" value={formData.harga} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Sisa Kuota</label>
        <input type="number" name="sisaQuota" value={formData.sisaQuota} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Tiket</button>
    </form>
  );
}
