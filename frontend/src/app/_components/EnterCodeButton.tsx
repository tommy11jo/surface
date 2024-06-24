"use client";
import { useState, useEffect } from "react";

export function EnterCodeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [tempCode, setTempCode] = useState("");

  useEffect(() => {
    const curCode = localStorage.getItem("userCode");
    if (curCode !== null) setCode(curCode);
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
  };

  const handleOpen = () => {
    setTempCode(code);
    setIsOpen(true);
  };

  const handleClose = () => {
    setTempCode("");
    setIsOpen(false);
  };

  const handleSave = () => {
    localStorage.setItem("userCode", tempCode);
    setCode(tempCode);
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
