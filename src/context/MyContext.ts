// MyContext.ts
import { createContext } from "react";

export type MyContextType = {
  value: TUserModel;
  setValue: (value: TUserModel) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
