import React, { createContext, useContext, useEffect, useState } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { GetUserQuery, useGetUserQuery, useLogOutUserMutation } from "../../../generated/graphql";
import { User } from "../models/user";
import { GraphQLClient } from "graphql-request";
import useSyncedLocalStorage from "../hooks/useSyncedLocalStorage";
import useAutoLogInUser from "../hooks/useAutoLogInUser";

interface AuthProviderProps {
  user: User | null;
  userId: string | null;
  setUserId: (id: string | null) => void;
  getUserRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<GetUserQuery, Error>>;
  logOut: () => void
}

const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useSyncedLocalStorage<string | null>("userId", null);
  const [user, setUser] = useState<User | null>(null);
  const [autoLoginUserError, setAutoLoginError] = useState<string>("");

  const { data, refetch: getUserRefetch } = useGetUserQuery<GetUserQuery, Error>(
    client,
    { userId: userId! },
    {
      enabled: !!userId,
      onSuccess: (data) => setUser(data.getUser),
    }
  );

  const { mutate } = useLogOutUserMutation<Error>(client, {
    onError: (error) => console.error("Logout error:", error),
    onSuccess: () => {
      setUserId(null)
      setUser(null);
    },
  });

  const logOut = () => mutate({ input: { userId: user?.id! } })

  const { isAutoLogInUserLoading, autoLogIn } = useAutoLogInUser(client, setAutoLoginError, () => { })

  useEffect(() => {
    if (!userId) return;
    autoLogIn({ input: { userId } });
  }, [userId]);

  return (
    <AuthContext.Provider value={{ user: user ?? null, userId, setUserId, getUserRefetch, logOut }}>
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