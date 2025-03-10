import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    return NextResponse.json({ message: "Tiket berhasil diperbarui!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Terjadi kesalahan saat update tiket." }, { status: 500 });
  }
}
