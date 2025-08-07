"use client";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { strict } from "assert";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleCheckFilter = (name: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (checked) {
      params.set(name, "true");
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="m-2 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
        className="w-64 px-4 py-2 bg-neutral-50 rounded-2xl text-black border-1"
      />
      <div>
        <input
          type="checkbox"
          onChange={(e) => handleCheckFilter("vegan", e.target.checked)}
        />
        <label className="ml-2">Vegan</label>
      </div>
      <div>
        <input
          type="checkbox"
          onChange={(e) => handleCheckFilter("vegetarisch", e.target.checked)}
        />
        <label className="ml-2">Vegetarisch</label>
      </div>
    </div>
  );
}
