import { GraphQLClient } from "graphql-request";

const createAutoLoginUserClient = () =>
  new GraphQLClient(`${process.env.REACT_APP_HOST}/graphql` as string, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.REACT_APP_ACCESS_TOKEN_SECRET!
      )}`,
      "Content-Type": "application/json",
    },
  });

export default createAutoLoginUserClient;
