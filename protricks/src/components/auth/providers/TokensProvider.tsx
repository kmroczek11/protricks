import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { GetAccessTokenQuery, GetRefreshTokenQuery, useGetAccessTokenQuery, useGetRefreshTokenQuery } from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction } from "@tanstack/react-query";

interface TokensProviderProps {
    refreshToken: string | null;
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    getAccessTokenRefetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<GetAccessTokenQuery, Error>>;
}

const TokensContext = createContext<TokensProviderProps | undefined>(undefined);

const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`)

const TokensProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["userId"])
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const { data: refreshTokenData } = useGetRefreshTokenQuery<GetRefreshTokenQuery, Error>(
        client,
        {
            userId: cookies.userId
        },
        {
            enabled: !!cookies.userId,
        }
    )

    const { data: accessTokenData, refetch: getAccessTokenRefetch } = useGetAccessTokenQuery<GetAccessTokenQuery, Error>(
        client,
        {
            userId: cookies.userId
        },
        {
            enabled: !!cookies.userId,
        }
    )

    useEffect(() => {
        if (!accessTokenData?.getAccessToken) return;
        setAccessToken(accessTokenData.getAccessToken);
    }, [accessTokenData]);

    useEffect(() => {
        console.log('cookies changed',cookies.userId)
        if (!cookies.userId) return;
      
        getAccessTokenRefetch().then(result => {
          const token = result.data?.getAccessToken;
          if (token) {
            setAccessToken(token);
          }
        });
      }, [cookies.userId]);      

    return (
        <TokensContext.Provider value={{
            refreshToken: refreshTokenData?.getRefreshToken ?? null,
            accessToken,
            setAccessToken,
            getAccessTokenRefetch
        }}>
            {children}
        </TokensContext.Provider>
    )
}

export const useTokens = () => {
    const context = useContext(TokensContext);
    if (!context) {
        throw new Error("useTokens must be used within an TokensProvider");
    }
    return context;
};

export default TokensProvider;