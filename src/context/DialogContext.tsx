"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type DialogContextType = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

type DialogProviderProps = {
  children: ReactNode;
};

function DialogProvider({ children }: DialogProviderProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ isOpened, setIsOpened }}>{children}</DialogContext.Provider>
  );
}

const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

export { DialogProvider, useDialogContext };
