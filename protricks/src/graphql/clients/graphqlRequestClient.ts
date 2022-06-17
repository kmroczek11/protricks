import { GraphQLClient } from "graphql-request";

const requestHeaders = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

const graphqlRequestClient = (useHeaders: boolean = true) =>
  new GraphQLClient(`${process.env.REACT_APP_ENDPOINT}/graphql` as string, {
    headers: useHeaders ? requestHeaders : undefined,
  });

export default graphqlRequestClient;
