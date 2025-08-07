import type { MenuItem, PaginatedMenuResponse } from "./types";

const BASE_URL = "http://backend:8000";
console.log("TEST" , process.env.NEXT_PUBLIC_API_URL)

export async function fetchMenuItems(
  query: string,
  page: number,
  isVegan: string,
  isVegeterian: string
): Promise<MenuItem[] | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/menu-item/?q=${encodeURIComponent(
        query
      )}&page=${page}&vegan=${isVegan}&vegetarisch=${isVegeterian}`
      // { cache: "no-store" } wichtig? aus nutzen prüfen
    );
    if (!res.ok) throw new Error(`Fehler beim Laden: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fehler beim Abrufen der Menüitems:", err);
    return null;
  }
}

export async function fetchMenuPages(
  query: string,
  isVegan: string,
  isVegeterian: string
): Promise<number> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/menu-item/pages/?q=${encodeURIComponent(
        query
      )}&vegan=${isVegan}&vegetarisch=${isVegeterian}`
    );
    if (!res.ok) throw new Error(`Fehler beim Laden: ${res.status}`);
    return parseInt(await res.json());
  } catch (err) {
    console.error("Fehler beim Laden der Seitenanzahl:", err);
    return 0;
  }
}
