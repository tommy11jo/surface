import React, { Suspense, type ReactNode } from "react";

interface SearchResultsLayoutProps {
  children: ReactNode;
}

export default function SearchResultsLayout({
  children,
}: SearchResultsLayoutProps): JSX.Element {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
