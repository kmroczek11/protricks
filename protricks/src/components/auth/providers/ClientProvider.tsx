import { createContext, useContext, useEffect, useState } from "react"
import { GraphQLClient, gql, Variables, RequestDocument, RequestOptions } from "graphql-request";
import { useAuth } from "./AuthProvider";
import { RefreshTokenMutation, RefreshTokenMutationVariables } from "../../../generated/graphql";
import { useTokens } from "./TokensProvider";
import { MaybeFunction } from "graphql-request/dist/types";

interface ClientProviderProps {
  client: GraphQLClient | null,
  accessClient: GraphQLClient | null,
  fileUploadClient: GraphQLClient | null,
}

type RequestHeaders = Record<string, string>

const ClientContext = createContext<ClientProviderProps>({ client: null, accessClient: null, fileUploadClient: null })

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(refreshTokenInput: $input) {
      accessToken
    }
  }
`

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<GraphQLClient | null>(null)
  const [accessClient, setAccessClient] = useState<GraphQLClient | null>(null)
  const [fileUploadClient, setFileUploadClient] = useState<GraphQLClient | null>(null)
  const { refreshToken, accessToken, setAccessToken, getAccessTokenRefetch } = useTokens()
  const { logOut } = useAuth()

  function initializeClient() {
    setClient(new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`))
  }

  function createClientWithTokens(headers: MaybeFunction<HeadersInit | undefined>) {
    const client = new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql`, {
      headers
    });

    const originalRequest = client.request.bind(client)

    client.request = async function <T = any, V = Variables>(
      documentOrOptions: RequestDocument | RequestOptions<V>,
      variables?: V,
      requestHeaders?: RequestHeaders
    ): Promise<T> {
      const isRequestDocument =
        typeof documentOrOptions === "string" || "kind" in documentOrOptions

      const makeRequest = () => {
        if (isRequestDocument) {
          return (originalRequest as any)(
            documentOrOptions,
            variables,
            requestHeaders
          ) as Promise<T>
        } else {
          return (originalRequest as any)(documentOrOptions) as Promise<T>
        }
      };

      try {
        return await makeRequest();
      } catch (error: any) {
        if (error.response?.errors?.[0]?.message === "Unauthorized") {
          try {
            const refreshClient = client;
            const response = await refreshClient.request<
              RefreshTokenMutation,
              RefreshTokenMutationVariables
            >(REFRESH_TOKEN_MUTATION, {
              input: { refreshToken: refreshToken! },
            });

            const newAccessToken = response?.refreshToken?.accessToken;
            if (!newAccessToken) {
              logOut()
              throw new Error("No access token received after refresh.")
            }

            setAccessToken(newAccessToken)
            getAccessTokenRefetch()

            client.setHeaders({
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            });

            return await makeRequest();
          } catch (refreshError) {
            logOut()
            throw refreshError
          }
        }

        throw error
      }
    };

    return client
  }

  useEffect(() => {
    initializeClient()
  }, [])

  useEffect(() => {
    if (!refreshToken || !accessToken) return

    setAccessClient(
      createClientWithTokens({
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }))

    setFileUploadClient(
      createClientWithTokens({
        Authorization: `Bearer ${accessToken}`
      }))
  }, [refreshToken, accessToken])

  return <ClientContext.Provider value={{ client, accessClient, fileUploadClient }}>{children}</ClientContext.Provider>
}

export const useClient = () => useContext(ClientContext)

export default ClientProvider;