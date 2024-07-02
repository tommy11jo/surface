"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface SecretCodeContextType {
  secretCode: string;
  setSecretCode: React.Dispatch<React.SetStateAction<string>>;
  secretLoading: boolean;
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
  const [secretLoading, setSecretLoading] = useState(true);

  useEffect(() => {
    const storedCode = localStorage.getItem("userCode");
    if (storedCode) {
      setSecretCode(storedCode);
    }
    setSecretLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("userCode", secretCode);
  }, [secretCode]);

  return (
    <SecretCodeContext.Provider
      value={{ secretCode, setSecretCode, secretLoading }}
    >
      {children}
    </SecretCodeContext.Provider>
  );
};

export { SecretCodeProvider, useSecretCode };
