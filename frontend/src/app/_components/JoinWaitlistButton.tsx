"use client";
export function JoinWaitlistButton() {
  const handleClick = () => {
    console.log("not handled");
  };
  return (
    <button onClick={handleClick} className="font-semibold hover:underline">
      → Join waitlist
    </button>
  );
}
