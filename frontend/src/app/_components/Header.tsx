"use client";
import { EnterCodeButton } from "./EnterCodeButton";
import { JoinWaitlistButton } from "./JoinWaitlistButton";

export function Header() {
  return (
    <div className="bg-sand flex w-full flex-row items-center justify-between px-10 py-3">
      <h3 className="text-xl font-semibold">Surface</h3>
      <div className="flex flex-row gap-4">
        <EnterCodeButton />
        <JoinWaitlistButton />
      </div>
    </div>
  );
}
