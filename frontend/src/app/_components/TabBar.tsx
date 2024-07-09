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
          className={`${activeTab === TabType.Answer ? "underline decoration-gray-500 decoration-dashed" : ""} hover:underline`}
        >
          Verified Answers
        </Link>
        {/* <Link
          href="/search"
          className={`${activeTab === TabType.Search ? "underline decoration-gray-500 decoration-dashed" : ""} hover:underline`}
        >
          Search Results
        </Link> */}
      </div>
      <div className="mx-4">
        <div className="text-sm text-gray-500 sm:text-base">
          {activeTab === TabType.Answer && (
            <span>⚡ AI answers, verified using web sources</span>
          )}
          {activeTab === TabType.Search && (
            <span>🌐 High-quality, info-packed search results</span>
          )}
        </div>
      </div>
    </div>
  );
}
