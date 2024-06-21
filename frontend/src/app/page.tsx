import { SearchDisplay } from "./_components/SearchDisplay";
import { Header } from "./_components/Header";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-lightest-sand text-base text-black sm:text-lg">
      <Header />
      <div className="flex w-full max-w-7xl flex-col items-center px-4 py-2">
        <SearchDisplay />
      </div>
    </main>
  );
}
