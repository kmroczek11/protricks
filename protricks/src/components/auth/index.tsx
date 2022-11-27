import { createContext, useContext, useEffect, useState } from "react";
import User from "./models/user";
import autoLoginUserClient from "../../graphql/clients/autoLoginUserClient";
import useAutoLogInUser from "./hooks/useAutoLogInUser";
import { CustomDialog } from "../lib";
import jwt from "jwt-decode";
import TokenPayload from "./models/tokenPayload";

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const unexpectedError =
  "Wystąpił nieoczekiwany błąd. Odśwież stronę. Skontaktuj się z administratorem strony.";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [autoLoginUserError, setAutoLoginError] = useState<string>("");

  const { isAutoLogInUserLoading, autoLogin } = useAutoLogInUser(
    autoLoginUserClient(),
    setAutoLoginError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.autoLogInUser.accessToken
      );
      setUser(data.autoLogInUser.user);
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem(
      process.env.REACT_APP_ACCESS_TOKEN_SECRET!
    )!;

    const userId: string | null = accessToken
      ? (jwt(accessToken!) as TokenPayload).id
      : null;

    if (
      !userId ||
      !localStorage.getItem(process.env.REACT_APP_REFRESH_TOKEN_SECRET!)
    )
      return;

    autoLogin({
      input: {
        userId: userId!,
      },
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
      {autoLoginUserError && (
        <CustomDialog
          title="Nieoczekiwany błąd"
          content={unexpectedError}
          onClose={() => setAutoLoginError("")}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
