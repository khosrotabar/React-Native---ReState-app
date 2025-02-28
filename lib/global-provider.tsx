import { createContext, PropsWithChildren, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null | undefined;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const { data: user, loading, refetch } = useAppwrite({ fn: getCurrentUser });

  const isLoggedIn = !!user;

  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider value={{ user, isLoggedIn, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useAuth = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useAuth must be used within a GlobalProvider");
  }

  return context;
};

export default GlobalProvider;
