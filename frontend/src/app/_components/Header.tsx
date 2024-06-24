"use client";
import Link from "next/link";
import { EnterCodeButton } from "./EnterCodeButton";

export function Header() {
  return (
    <div className="flex w-full flex-row items-center justify-between bg-sand px-2 py-2 sm:px-10">
      <Link href="/" className="text-xl font-semibold">
        Surface
      </Link>
      <div className="flex flex-row gap-2 sm:gap-4">
        <EnterCodeButton />
      </div>
    </div>
  );
}
