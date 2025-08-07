import { fetchMenuPages } from "@/app/lib/api";
import MenueList from "@/app/ui/menue/Menue";
import Pagignation from "@/app/ui/menue/Pagination";
import SearchBar from "@/app/ui/menue/Search";

export default async function Page(props: {
  searchParams?: Promise<{
    q?: string;
    page?: string;
    vegan?: string;
    vegetarisch?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const isVegan = searchParams?.vegan || "";
  const isVegeterian = searchParams?.vegetarisch || "";
  const totalPages = await fetchMenuPages(query, isVegan, isVegeterian);

  return (
    <div className="content-center align-middle justify-center">
      <SearchBar />
      <MenueList
        query={query}
        currentPage={currentPage}
        isVegan={isVegan}
        isVegeterian={isVegeterian}
      />
      <Pagignation totalPages={totalPages} />
    </div>
  );
}
