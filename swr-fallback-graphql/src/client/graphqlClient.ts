import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://beta.pokeapi.co/graphql/v1beta"
);
