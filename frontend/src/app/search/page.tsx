"use client";
import { useSearchParams } from "next/navigation";
import { SearchDisplay } from "../_components/SearchDisplay";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const encodedQuery = searchParams.get("q") ?? "";
  const query = decodeURIComponent(encodedQuery);
  const isExample = searchParams.get("isExample") === "true";
  const hardRefresh = searchParams.get("refresh") === "true";

  return (
    <div className="flex w-full max-w-7xl flex-col items-center px-2 py-2">
      <SearchDisplay
        query={query}
        isExample={isExample}
        hardRefresh={hardRefresh}
      />
    </div>
  );
}
