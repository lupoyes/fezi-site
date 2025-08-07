import type { MenuItem } from "@/app/lib/types";
import { fetchMenuItems } from "@/app/lib/api";
import Image from "next/image";

const BASE_URL = "http://backend:8000";

function MenuItem({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-col">
      <Image
        src={`${BASE_URL }${item.image}`}
        width={300}
        height={300}
        alt={item.name}
        className="object-cover max-h-32"
      />
      <h3 className="font-semibold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="italic mt-1">{item.price} €</p>
      <div className="flex gap-2 mt-1">
        {item.vegan && (
          <span className="text-xs bg-green-800 text-white px-2 py-0.5 rounded">
            Vegan
          </span>
        )}
        {item.vegetarisch && (
          <span className="text-xs bg-green-300 text-black px-2 py-0.5 rounded">
            Vegetarisch
          </span>
        )}
      </div>
    </div>
  );
}

export default async function MenueList({
  query,
  currentPage,
  isVegan,
  isVegeterian,
}: {
  query: string;
  currentPage: number;
  isVegan: string;
  isVegeterian: string;
}) {
  const data: MenuItem[] | null = await fetchMenuItems(
    (query = query),
    (currentPage = currentPage),
    (isVegan = isVegan),
    (isVegeterian = isVegeterian)
  );
  return (
    <div>
      {data?.length === 0 ? (
        <p className="text-center mt-10">Keine Menüeinträge gefunden.</p>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {data?.map((item, index) => (
            <MenuItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
