import Image from "next/image";
import { useRouter } from "next/navigation";
import img from "../../img/Placeholder.png";

const categories = [
  "Teater", 
  "Festival", 
  "Pameran", 
  "Konser", 
  "Eksibisi", 
  "Seminar",
  "Konferensi",
  "Workshop"
];

export default function PopularCategories() {
  const router = useRouter();

  return (
    <div className="p-4 mx-6">
      <h1 className="text-2xl font-bold mb-4">Popular Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition" 
            onClick={() => router.push(`/categories?category=${category}`)}
          >
            <Image src={img} alt={category} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
