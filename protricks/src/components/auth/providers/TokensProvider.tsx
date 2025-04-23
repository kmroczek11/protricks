import { createContext, useContext, useState } from "react"
import { useCookies } from "react-cookie";
import { GetAccessTokenQuery, GetRefreshTokenQuery, useGetAccessTokenQuery, useGetRefreshTokenQuery } from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";

interface TokensProviderProps {
    refreshToken: string | null;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

const TokensContext = createContext<TokensProviderProps>({
    refreshToken: null,
    accessToken: null,
    setAccessToken: async () => {
        throw new Error("setAccessToken not implemented");
    },
})

const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`)

export default function TokensProvider({ children }: { children: React.ReactNode }){
    const [cookies, setCookie, removeCookie] = useCookies(["userId"])
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    const { data: refreshTokenData } = useGetRefreshTokenQuery<GetRefreshTokenQuery, Error>(
        client,
        {
            userId: cookies.userId
        },
        {
            enabled: !!cookies.userId,
            onSuccess: (data) => { setRefreshToken(data.getRefreshToken) },
        }
    )

    const { data: accessTokenData } = useGetAccessTokenQuery<GetAccessTokenQuery, Error>(
        client,
        {
            userId: cookies.userId
        },
        {
            enabled: !!cookies.userId,
            onSuccess: (data) => { setAccessToken(data.getAccessToken) },
        }
    )

    return (
        <TokensContext.Provider value={{
            refreshToken: refreshToken ?? null,
            accessToken: accessToken ?? null,
            setAccessToken
        }}>
            {children}
        </TokensContext.Provider>
    )
}

export const useTokens = () => useContext(TokensContext)