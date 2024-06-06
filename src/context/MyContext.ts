// MyContext.ts
import { createContext } from 'react';

interface MyContextType {
    value: string;
    setValue: (value: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
