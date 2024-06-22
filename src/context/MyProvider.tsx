// MyProvider.tsx
import React, { useState, ReactNode } from "react";
import MyContext from "./MyContext";

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = useState<TUserModel | undefined>(undefined);

  return <MyContext.Provider value={{ value, setValue }}>{children}</MyContext.Provider>;
};

export default MyProvider;
