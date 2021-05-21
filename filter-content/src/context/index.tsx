import React, { createContext, ReactNode, useContext, useState } from "react";

interface IData {
  name: string;
  color: string;
  date: string;
}

interface ContextData {
  data: IData[];
  list: IData[];
  handleChange: (
    key: "name" | "color" | "date",
    event: React.ChangeEvent<{ value: string }>
  ) => void;
  setListInitialValue: () => void;
}

interface IFilter {
  fruit: string;
  color: string;
  date: string;
}

type ContextProviderProps = {
  children: ReactNode;
};

const data: IData[] = [
  {
    name: "banana 🍌",
    color: "yellow",
    date: "2021/05/05",
  },
  {
    name: "apple 🍎",
    color: "red",
    date: "2021/04/05",
  },
  {
    name: "strawberry 🍓",
    color: "red",
    date: "2021/05/27",
  },
  {
    name: "strawberry 🍓",
    color: "red",
    date: "2021/04/27",
  },
  {
    name: "strawberry 🍓",
    color: "red",
    date: "2021/02/27",
  },
  {
    name: "grape 🍇",
    color: "purple",
    date: "2021/05/13",
  },
  {
    name: "pumpkin 🎃",
    color: "orange",
    date: "2021/05/26",
  },
  {
    name: "tangerine 🍊",
    color: "orange",
    date: "2021/05/05",
  },
  {
    name: "watermelon 🍉",
    color: "green",
    date: "2021/05/13",
  },
  {
    name: "melon 🍈",
    color: "green",
    date: "2021/04/05",
  },
  {
    name: "green apple 🍏",
    color: "green",
    date: "2021/04/12",
  },
];

export const FilterContext = createContext({} as ContextData);

export function FilterContextProvider({ children }: ContextProviderProps) {
  const [list, setList] = useState<IData[]>(data);
  const [filter, setFilter] = useState<IFilter>({
    fruit: "",
    color: "",
    date: "",
  });

  function handleChange(
    key: "name" | "color" | "date",
    event: React.ChangeEvent<{ value: string }>
  ): void {
    filterList(key, event.target.value);
  }

  function filterList(key: "name" | "color" | "date", value: string): void {
    const newList = data.filter((item) => item[key] === value);
    setList(newList);
  }

  function setListInitialValue(): void {
    setList(data);
  }

  return (
    <FilterContext.Provider
      value={{
        data,
        list,
        handleChange,
        setListInitialValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  return useContext(FilterContext);
};
