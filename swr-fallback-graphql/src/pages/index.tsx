import type { GetStaticProps, NextPage } from "next";
import { PokemonList } from "../components/PokemonList";
import { SWRConfig } from "swr";
import { unstable_serialize } from "swr";

import { RequestDocument } from "graphql-request";
import { graphqlClient } from "../client/graphqlClient";

const pokemonQuery = `{ species: pokemon_v2_pokemonspecies(order_by: {id: asc},  limit: 24, offset: ${
  1 * 24
}) { 
  name,
}}`;

const fetcher = (query: RequestDocument) => graphqlClient.request(query);

const Home = ({ fallback }: any): JSX.Element => {
  return (
    <div>
      <SWRConfig value={{ fallback }}>
        <PokemonList fallback={fallback} />
      </SWRConfig>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryName = "pokemon_v2_pokemonspecies";

  const pokemonList = await fetcher(pokemonQuery);

  return {
    props: {
      fallback: {
        [unstable_serialize([queryName, 1])]: pokemonList,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
