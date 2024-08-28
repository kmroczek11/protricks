import {
  LogInUserMutation,
  LogInUserMutationVariables,
  useLogInUserMutation,
} from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";

const useLogInUser = (
  client: GraphQLClient,
  onErrorCallback: React.Dispatch<React.SetStateAction<string>>,
  onSuccessCallback: (data: LogInUserMutation) => void
) => {
  const { isLoading: isLogInLoading, mutate: logIn } =
    useLogInUserMutation<Error>(client, {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        onErrorCallback(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: LogInUserMutation,
        _variables: LogInUserMutationVariables,
        _context: unknown
      ) => onSuccessCallback(data),
    });

  return { isLogInLoading, logIn };
};

export default useLogInUser;
