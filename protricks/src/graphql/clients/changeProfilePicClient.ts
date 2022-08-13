import { GraphQLClient } from "graphql-request";

const createChangeProfilePicClient = () =>
  new GraphQLClient(`${process.env.REACT_APP_ENDPOINT}/graphql` as string, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!
      )}`,
    },
  });

export default createChangeProfilePicClient;
