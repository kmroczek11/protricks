import { createContext, useContext, useEffect, useState } from "react"
import { GetAccessTokenQuery, GetRefreshTokenQuery, useGetAccessTokenQuery, useGetRefreshTokenQuery } from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";

interface TokensProviderProps {
    refreshToken: string | null;
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    getAccessTokenRefetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<GetAccessTokenQuery, Error>>;
}

const TokensContext = createContext<TokensProviderProps | undefined>(undefined);

const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`)

const TokensProvider = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAuth()
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const { data: refreshTokenData } = useGetRefreshTokenQuery<GetRefreshTokenQuery, Error>(
        client,
        {
            userId: userId!
        },
        {
            enabled: !!userId,
        }
    )

    const { data: accessTokenData, refetch: getAccessTokenRefetch } = useGetAccessTokenQuery<GetAccessTokenQuery, Error>(
        client,
        {
            userId: userId!
        },
        {
            enabled: !!userId,
        }
    )

    useEffect(() => {
        if (!accessTokenData?.getAccessToken) return;
        setAccessToken(accessTokenData.getAccessToken);
    }, [accessTokenData]);

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