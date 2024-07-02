import Link from "next/link";

type TabBarProps = {
  activeTab: TabType;
};

export enum TabType {
  Answer = "answer",
  Search = "search",
}

export function TabBar({ activeTab }: TabBarProps) {
  return (
    <div className="flex w-full flex-col items-center justify-between border-b border-dark-sand p-2">
      <div className="flex gap-8 font-semibold">
        <Link
          href="/answer"
          className={`${activeTab === TabType.Answer ? "underline" : ""}`}
        >
          Direct Answer
        </Link>
        <Link
          href="/search"
          className={`${activeTab === TabType.Search ? "underline" : ""}`}
        >
          Search Results
        </Link>
      </div>
      <div className="mx-4">
        <div className="text-sm text-gray-500 sm:text-base">
          {activeTab === TabType.Answer && (
            <span>⚡ Quick LLM answers, verified afterwards</span>
          )}
          {activeTab === TabType.Search && (
            <span>🌐 High-Quality, Info-Packed Search Results</span>
          )}
        </div>
      </div>
    </div>
  );
}
