import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from "../../../generated/graphql";
import { GraphQLClient } from "graphql-request";

const useRegisterUser = (
  client: GraphQLClient,
  onErrorCallback: React.Dispatch<React.SetStateAction<string>>,
  onSuccessCallback: (data: RegisterUserMutation) => void
) => {
  const { isLoading: isRegisterLoading, mutate: register } =
    useRegisterUserMutation<Error>(client, {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        onErrorCallback(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: RegisterUserMutation,
        _variables: RegisterUserMutationVariables,
        _context: unknown
      ) => onSuccessCallback(data),
    });

  return { isRegisterLoading, register };
};

export default useRegisterUser;
