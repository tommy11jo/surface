import { Suspense } from "react";
import { TabType, TabBar } from "../_components/TabBar";

export default function AnswerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TabBar activeTab={TabType.Answer} />
      <main className="flex min-h-screen w-full flex-col items-center bg-lightest-sand text-base text-black sm:text-lg">
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}
