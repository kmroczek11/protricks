import {
  AutoLogInUserMutation,
  AutoLogInUserMutationVariables,
  useAutoLogInUserMutation,
} from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";

export default function useAutoLogInUser(
  client: GraphQLClient,
  onErrorCallback: React.Dispatch<React.SetStateAction<string>>,
  onSuccessCallback: (data: AutoLogInUserMutation) => void,
) {
  const { isLoading: isAutoLogInUserLoading, mutate: autoLogIn } =
    useAutoLogInUserMutation<Error>(client, {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        onErrorCallback(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: AutoLogInUserMutation,
        _variables: AutoLogInUserMutationVariables,
        _context: unknown
      ) => onSuccessCallback(data),
    }
    );

  return { isAutoLogInUserLoading, autoLogIn };
};