import Image from "next/image";
import img from "../../img/Placeholder.png";

export default function HeroSection() {
  return (
    <div className="mx-6 flex flex-col md:flex-row items-center justify-between p-6 app_primary text-white mt-6 rounded-lg">
      <div>
        <h1 className="text-3xl font-bold">Coldplay</h1>
        <button className="mt-4 app_secondary px-4 py-2 rounded-lg text-white">See Tickets</button>
      </div>
      <Image src={img} alt="Coldplay Concert" className="w-full md:w-1/2 h-48 object-cover rounded-lg" />
    </div>
  );
}
