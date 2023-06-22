import { createContext, useContext, useEffect, useState } from "react";
import User from "./models/user";
import useAutoLogInUser from "./hooks/useAutoLogInUser";
import { CustomDialog } from "../lib";
import jwt from "jwt-decode";
import TokenPayload from "./models/tokenPayload";
import {
  sessionHasExpiredMessage
} from "../../translations/pl/errorMessages";
import createAutoLoginUserClient from "../../graphql/clients/autoLoginUserClient";

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [autoLoginUserError, setAutoLoginError] = useState<string>("");

  const { isAutoLogInUserLoading, autoLogin } = useAutoLogInUser(
    createAutoLoginUserClient(),
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
      ? (jwt(accessToken!) as TokenPayload).sub
      : null;

    if (
      !userId
    )
      return;

      console.log('autoLogin')

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
        setUser,
      }}
    >
      {children}
      {autoLoginUserError === "Unauthorized" ?(
        <CustomDialog
          title="Twoja sesja wygasła"
          content={sessionHasExpiredMessage}
          onClose={() => setAutoLoginError("")}
        />
      ):
      autoLoginUserError && (
        <CustomDialog
          title="Nieoczekiwany błąd"
          content={autoLoginUserError}
          onClose={() => setAutoLoginError("")}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
