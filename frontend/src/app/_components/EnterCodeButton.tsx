"use client";
import { useState, useEffect, useRef } from "react";
import { useSecretCode } from "../secretContext";

export function EnterCodeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [tempCode, setTempCode] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { secretCode, setSecretCode } = useSecretCode();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
  };

  useEffect(() => {
    if (isOpen) inputRef.current!.focus();
  }, [isOpen]);
  const handleOpen = () => {
    setTempCode(secretCode);
    setIsOpen(true);
  };

  const handleClose = () => {
    setTempCode("");
    setIsOpen(false);
  };

  const handleSave = () => {
    localStorage.setItem("userCode", tempCode);
    setSecretCode(tempCode);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 font-semibold hover:underline"
      >
        Enter Code →
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-96 rounded bg-lightest-sand p-6 shadow-lg">
            <h2 className="text-lg text-black">Enter code:</h2>
            <input
              type="text"
              value={tempCode}
              onChange={(e) => setTempCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mb-4 mt-2 w-full border p-2"
              ref={inputRef}
            />
            <div className="flex justify-between gap-2">
              <button onClick={handleClose} className="rounded hover:underline">
                Cancel →
              </button>
              <button onClick={handleSave} className="rounded hover:underline">
                Save →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
