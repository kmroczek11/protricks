import {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  useRefreshTokenMutation,
} from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";

const useRefreshUserToken = (
  client: GraphQLClient,
  onErrorCallback: React.Dispatch<React.SetStateAction<string>>,
  onSuccessCallback: (data: RefreshTokenMutation) => void
) => {
  const { isLoading: isRefreshTokenLoading, mutate: refresh } =
    useRefreshTokenMutation<Error>(client, {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        onErrorCallback(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: RefreshTokenMutation,
        _variables: RefreshTokenMutationVariables,
        _context: unknown
      ) => onSuccessCallback(data),
    });

  return { isRefreshTokenLoading, refresh };
};

export default useRefreshUserToken;
