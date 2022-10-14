import { createContext, useContext, useEffect, useState } from "react";
import User from "./models/user";
import {
  RegisterUserMutation,
  RegisterUserInput,
  LogInUserMutation,
  LogInUserInput,
  Exact,
} from "../../generated/graphql";
import createAccessClient from "../../graphql/clients/accessClient";
import createChangeProfilePicClient from "../../graphql/clients/changeProfilePicClient";
import autoLoginUserClient from "../../graphql/clients/autoLoginUserClient";
import TokenPayload from "./models/tokenPayload";
import jwt from "jwt-decode";
import { UseMutateFunction } from "react-query";
import { GraphQLClient } from "graphql-request";
import useRegisterUser from "./hooks/useRegisterUser";
import useLogInUser from "./hooks/useLogInUser";
import useAutoLogInUser from "./hooks/useAutoLogInUser";
import useRefreshUserToken from "./hooks/useRefreshUserToken";
import useInterval from "./hooks/useInterval";
import { CustomDialog } from "../lib";

/**
 * Creates authorization context
 *
 * @param user - Authenticated user
 * @param setUser - Function for setting modified user
 * @param accessClient - GraphQLClient for access requests
 * @param changeProfilePicClient - GraphQLClient for changing a profile pic request
 * @param isRegisterInLoading - Boolean that indicates if user is registering
 * @param registerError - Error returned by register function
 * @param register - Function for registering
 * @param isLogInLoading - Boolean that indicates if user is logged in
 * @param logInError - Error returned by logIn function
 * @param logIn - Function for logging in
 * @param setRefreshToken - Function for setting a refresh token
 */

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessClient: GraphQLClient | null;
  changeProfilePicClient: GraphQLClient | null;
  isRegisterLoading: boolean;
  registerError: string;
  register: UseMutateFunction<
    RegisterUserMutation,
    Error,
    Exact<{
      input: RegisterUserInput;
    }>,
    unknown
  >;
  isLogInLoading: boolean;
  logInError: string;
  logIn: UseMutateFunction<
    LogInUserMutation,
    Error,
    Exact<{
      input: LogInUserInput;
    }>,
    unknown
  >;
}>({
  user: null,
  setUser: () => {},
  accessClient: null,
  changeProfilePicClient: null,
  isRegisterLoading: false,
  registerError: "",
  register: () => {},
  isLogInLoading: false,
  logInError: "",
  logIn: () => {},
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
  const accessToken = localStorage.getItem(
    process.env.REACT_APP_ACCESS_TOKEN_SECRET!
  )!;
  const userId: string | null = accessToken
    ? (jwt(accessToken!) as TokenPayload).id
    : null;
  const [accessClient, setAccessClient] = useState<GraphQLClient>(
    createAccessClient()
  );
  const [changeProfilePicClient, setChangeProfilePicClient] =
    useState<GraphQLClient>(createChangeProfilePicClient());
  const [expiration, setExpiration] = useState<number | null>(null);

  const [registerError, setRegisterError] = useState<string>("");
  const [logInError, setLogInError] = useState<string>("");
  const [autoLoginUserError, setAutoLoginError] = useState<string>("");
  const [refreshError, setRefreshError] = useState<string>("");

  const { isRegisterLoading, register } = useRegisterUser(
    accessClient,
    setRegisterError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_REFRESH_TOKEN_SECRET!,
        data.registerUser.refreshToken
      );
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.registerUser.accessToken
      );
      setUser(data.registerUser.user);
      setExpiration(data.registerUser.expiresIn);
      setAccessClient(createAccessClient());
      setChangeProfilePicClient(createChangeProfilePicClient());
    }
  );

  const { isLogInLoading, logIn } = useLogInUser(
    accessClient,
    setLogInError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_REFRESH_TOKEN_SECRET!,
        data.logInUser.refreshToken
      );
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.logInUser.accessToken
      );
      setUser(data.logInUser.user);
      setExpiration(data.logInUser.expiresIn);
      setAccessClient(createAccessClient());
      setChangeProfilePicClient(createChangeProfilePicClient());
    }
  );

  const { isAutoLogInUserLoading, autoLogin } = useAutoLogInUser(
    autoLoginUserClient(),
    setAutoLoginError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.autoLogInUser.accessToken
      );
      setUser(data.autoLogInUser.user);
      setExpiration(data.autoLogInUser.expiresIn);
      setAccessClient(createAccessClient());
      setChangeProfilePicClient(createChangeProfilePicClient());
    }
  );

  const { isRefreshTokenLoading, refresh } = useRefreshUserToken(
    accessClient,
    setRefreshError,
    (data) => {
      localStorage.setItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!,
        data.refreshToken.accessToken
      );
      setAccessClient(createAccessClient());
      setChangeProfilePicClient(createChangeProfilePicClient());
    }
  );

  useEffect(() => {
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

  useInterval(() => {
    if (
      !user ||
      !localStorage.getItem(process.env.REACT_APP_REFRESH_TOKEN_SECRET!)
    )
      return;

    refresh({
      input: {
        refreshToken: localStorage.getItem(
          process.env.REACT_APP_REFRESH_TOKEN_SECRET!
        )!,
      },
    });
  }, expiration! - 2000);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessClient,
        changeProfilePicClient,
        isRegisterLoading,
        registerError,
        register,
        isLogInLoading,
        logInError,
        logIn,
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
