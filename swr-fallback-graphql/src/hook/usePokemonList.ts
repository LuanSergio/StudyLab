import useSWR from "swr";
import { graphqlClient } from "../client/graphqlClient";
import { RequestDocument } from "graphql-request";

interface IUsePokemonListParams {
  page: number;
}

interface IUsePokemonListReponse {
  pokemonList: any;
  isLoading: boolean;
}

export default function usePokemonList({
  page,
}: IUsePokemonListParams): IUsePokemonListReponse {
  const queryName = "pokemon_v2_pokemonspecies";

  // const query = (page: number) => {
  //   return `{ species: pokemon_v2_pokemonspecies(order_by: {id: asc},  limit: 24, offset: ${
  //     page * 24
  //   }) {
  //     name,
  //   }}`;
  // };

  const fetcher = (name: string, page: number) => {
    const query: RequestDocument = `{ species: ${name}(order_by: {id: asc},  limit: 24, offset: ${
      page * 24
    }) { 
      name,
    }}`;

    return graphqlClient.request(query);
  };

  const { data, error } = useSWR([queryName, page], fetcher);

  // console.log("has fetched", data, size);
  return {
    pokemonList: data,
    isLoading: !error && !data,
  };
}
