import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

declare interface IPokemonData {
  id: number;
  name: string;
  types: string[];
  image: string;
}

const InfiniteScroll = () => {
  const loader = useRef<HTMLDivElement>(null);

  const [pokemonCounter, setPokemonCounter] = useState(0);
  const [pokemonList, setPokemonList] = useState<IPokemonData[]>([]);
  const [pokemon, setPokemon] = useState<IPokemonData[]>([]);
  const [pageYOffset, setPageYOffset] = useState(0);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPageYOffset(window.pageYOffset);
      setPokemonCounter((counter) => counter + 100);
    }
  };

  async function getAvailablePokemonQuantity() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokedex/1/");
    return response.data.pokemon_entries.length;
  }

  async function fetchPokemonData() {
    const quantity: number = await getAvailablePokemonQuantity();
    const pokemonUrlList = [];

    for (let i = 1; i <= quantity; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      pokemonUrlList.push(url);
    }

    const promises = pokemonUrlList.map((url) => axios.get(url));
    const response = await axios.all(promises);

    return response;
  }

  async function getPokemonInformation() {
    const responses = await fetchPokemonData();
    const pokemonInformation = [];

    responses.forEach((response) => {
      const pokemonData: IPokemonData = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map((item) => item.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
      };

      pokemonInformation.push(pokemonData);
    });

    return pokemonInformation;
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `20px`,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader?.current) {
      observer.observe(loader.current);
    }
  }, [loader]);

  useEffect(() => {
    const count = pokemon.length;
    setPokemon((previousState) => [
      ...previousState,
      ...pokemonList.slice(count, count + 10),
    ]);
  }, [pokemonCounter, pokemonList]);

  useEffect(() => {
    setPokemon([...pokemonList.slice(0, 10)]);
  }, [pokemonList]);

  useEffect(() => {
    async function setPokemonData() {
      setPokemonList(await getPokemonInformation());
    }
    setPokemonData();
  }, []);

  useEffect(() => {
    window.scroll({ top: pageYOffset });
  }, [pokemon, pageYOffset]);

  return (
    <div className={styles.container}>
      <div>
        {pokemon.map((post: IPokemonData, index: number) => {
          return (
            <div
              key={index}
              className={` ${styles.post} ${styles[post.types[0]]}`}
            >
              <img
                className={styles.pokemonImage}
                src={post.image}
                alt={post.name}
              />
              <h2 className={styles.pokemonName}>{post.name}</h2>
            </div>
          );
        })}
        <div className={styles.loading} ref={loader}>
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
