import { createContext, useContext, useEffect, useState } from "react";
import User from "./models/user";
import autoLoginUserClient from "../../graphql/clients/autoLoginUserClient";
import useAutoLogInUser from "./hooks/useAutoLogInUser";
import { CustomDialog } from "../lib";
import jwt from "jwt-decode";
import TokenPayload from "./models/tokenPayload";
import useRefreshUserToken from "./hooks/useRefreshUserToken";

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

const invalidTokenError =
  "Błąd autoryzacji. Odśwież stronę. Skontaktuj się z administratorem strony.";

const unexpectedError =
  "Wystąpił nieoczekiwany błąd. Odśwież stronę. Skontaktuj się z administratorem strony.";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [autoLoginUserError, setAutoLoginError] = useState<string>("");
  const [refreshError, setRefreshError] = useState<string>("");

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

  const { isRefreshTokenLoading, refresh } = useRefreshUserToken(
    autoLoginUserClient(),
    setRefreshError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.refreshToken.accessToken
      );
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

  const refreshToken = () => {
    if (
      !user ||
      !localStorage.getItem(process.env.REACT_APP_REFRESH_TOKEN_SECRET!)
    )
      return;

    console.log("refreshing token");

    refresh({
      input: {
        refreshToken: localStorage.getItem(
          process.env.REACT_APP_REFRESH_TOKEN_SECRET!
        )!,
      },
    });
  };

  //TODO:CHECK IF WORKS ON A TAB CHANGE

  useEffect(() => {
    setInterval(
      refreshToken,
      parseInt(process.env.REACT_APP_REFRESH_TOKEN_EXPIRATION!)
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      {refreshError === "Invalid token" ? (
        <CustomDialog
          title="Błąd"
          content={invalidTokenError}
          onClose={() => setRefreshError("")}
        />
      ) : (
        refreshError && (
          <CustomDialog
            title="Nieoczekiwany błąd"
            content={unexpectedError}
            onClose={() => setRefreshError("")}
          />
        )
      )}
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
