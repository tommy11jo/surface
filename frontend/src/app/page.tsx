import { Suspense } from "react";
import { SearchDisplay } from "./_components/SearchDisplay";

export default async function Home() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center px-2 py-2">
      <Suspense>
        <SearchDisplay />
      </Suspense>
    </div>
  );
}
