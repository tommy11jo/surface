"use client";
import { EnterCodeButton } from "./EnterCodeButton";
import { JoinWaitlistButton } from "./JoinWaitlistButton";

export function Header() {
  return (
    <div className="flex w-full flex-row items-center justify-between bg-sand px-2 py-2 sm:px-10">
      <h3 className="text-xl font-semibold">Surface</h3>
      <div className="flex flex-row gap-2 sm:gap-4">
        <EnterCodeButton />
        <JoinWaitlistButton />
      </div>
    </div>
  );
}
