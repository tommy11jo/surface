"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SecretCodeContextType {
  secretCode: string;
  setSecretCode: React.Dispatch<React.SetStateAction<string>>;
}

const SecretCodeContext = createContext<SecretCodeContextType | undefined>(
  undefined,
);

const useSecretCode = () => {
  const context = useContext(SecretCodeContext);
  if (!context) {
    throw new Error("useSecretCode must be used within a SecretCodeProvider");
  }
  return context;
};

const SecretCodeProvider = ({ children }: { children: ReactNode }) => {
  const [secretCode, setSecretCode] = useState<string>("");

  useEffect(() => {
    const curCode = localStorage.getItem("userCode");
    if (curCode !== null) setSecretCode(curCode);
  }, []);

  return (
    <SecretCodeContext.Provider value={{ secretCode, setSecretCode }}>
      {children}
    </SecretCodeContext.Provider>
  );
};

export { SecretCodeProvider, useSecretCode };
