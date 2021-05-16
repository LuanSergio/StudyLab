import React, { createContext, ReactNode, useContext, useState } from "react";

interface IData {
  name: string;
  color: string;
  createdAt: string;
}

interface ContextData {
  data: IData[];
  list: IData[];
  handleFruitChange: (event: React.ChangeEvent<{ value: string }>) => void;
  handleColorChange: (event: React.ChangeEvent<{ value: string }>) => void;
}

type ContextProviderProps = {
  children: ReactNode;
};

export const FilterContext = createContext({} as ContextData);

export function FilterContextProvider({ children }: ContextProviderProps) {
  const data: IData[] = [
    {
      name: "banana 🍌",
      color: "yellow",
      createdAt: "2021/05/05",
    },
    {
      name: "apple 🍎",
      color: "red",
      createdAt: "2021/04/05",
    },
    {
      name: "strawberry 🍓",
      color: "red",
      createdAt: "2021/05/27",
    },
    {
      name: "strawberry 🍓",
      color: "red",
      createdAt: "2021/04/27",
    },
    {
      name: "strawberry 🍓",
      color: "red",
      createdAt: "2021/02/27",
    },
    {
      name: "grape 🍇",
      color: "purple",
      createdAt: "2021/05/13",
    },
    {
      name: "pumpkin 🎃",
      color: "orange",
      createdAt: "2021/05/26",
    },
    {
      name: "tangerine 🍊",
      color: "orange",
      createdAt: "2021/05/05",
    },
    {
      name: "watermelon 🍉",
      color: "green",
      createdAt: "2021/05/13",
    },
    {
      name: "melon 🍈",
      color: "green",
      createdAt: "2021/04/05",
    },
    {
      name: "green apple 🍏",
      color: "green",
      createdAt: "2021/04/12",
    },
  ];

  const [list, setList] = useState<IData[]>(data);

  function handleFruitChange(
    event: React.ChangeEvent<{ value: string }>
  ): void {
    const newList = data.filter((item) => item.name === event.target.value);
    setList(newList);
  }

  function handleColorChange(
    event: React.ChangeEvent<{ value: string }>
  ): void {
    const newList = data.filter((item) => item.color === event.target.value);
    setList(newList);
  }

  return (
    <FilterContext.Provider
      value={{
        data,
        list,
        handleFruitChange,
        handleColorChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  return useContext(FilterContext);
};
