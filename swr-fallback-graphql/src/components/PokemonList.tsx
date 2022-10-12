import { useEffect, useState } from "react";
import useSWR from "swr";
import usePokemonList from "../hook/usePokemonList";
import styles from "../styles/Home.module.css";

export const PokemonList = ({ fallback }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { pokemonList } = usePokemonList({ page: currentPage });

  useEffect(() => {
    console.log("data", pokemonList);
    console.log("fallback", fallback);
  }, [pokemonList]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Pokemon list</h1>

        <ul>
          {pokemonList.species?.length > 0 &&
            pokemonList?.species.map((pokemon: any) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
        </ul>

        <button
          onClick={() => setCurrentPage((currentState) => currentState + 1)}
        >
          next
        </button>
      </main>
    </div>
  );
};
