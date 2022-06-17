import { createContext, useContext, useState } from "react";
import User from "./models/user";

const AuthContext = createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>]
>([null, () => {}]);

interface AuthProviderProps {
  userData: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  userData,
  children,
}) => {
  const [user, setUser] = useState(userData);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
