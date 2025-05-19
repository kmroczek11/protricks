import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction } from "@tanstack/react-query";
import { Exact, GetUserQuery, LogOutUserInput, LogOutUserMutation, LogOutUserMutationVariables, useGetUserQuery, useLogOutUserMutation } from "../../../generated/graphql";
import { User } from "../models/User";
import useAutoLogInUser from "../hooks/useAutoLogInUser";
import { GraphQLClient } from "graphql-request";

interface AuthProviderProps {
  user: User | null;
  getUserRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<GetUserQuery, Error>>;
  logOut: () => void
}

const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [user, setUser] = useState<User | null>(null);

  const { data, refetch: getUserRefetch } = useGetUserQuery<GetUserQuery, Error>(
    client,
    { userId: cookies.userId },
    {
      enabled: !!cookies.userId,
      onSuccess: (data) => setUser(data.getUser),
    }
  );

  const { mutate } = useLogOutUserMutation<Error>(client, {
    onError: (error) => console.error("Logout error:", error),
    onSuccess: () => {
      removeCookie("userId", { path: '/' });
      setUser(null);
    },
  });

  const logOut = () => mutate({ input: { userId: user?.id! } })

  useEffect(() => {
    if (!cookies.userId) return;
    getUserRefetch();
  }, [cookies.userId]);

  return (
    <AuthContext.Provider value={{ user: user ?? null, getUserRefetch, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;