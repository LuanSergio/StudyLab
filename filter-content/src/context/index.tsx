import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";

interface IData {
  name: string;
  color: string;
  date: string;
}

interface ContextData {
  data: IData[];
  list: IData[];
  handleChange: (
    key: keyof IData,
    event: React.ChangeEvent<{ value: string }>
  ) => void;
  setListInitialValue: () => void;
}

interface IFilter {
  name: string;
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
  const [list, setList] = useState<IData[]>([...data]);
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    color: "",
    date: "",
  });

  function formatDate(value: string) {
    const date = new Date(value);
    const fixedDate = new Date(
      date.valueOf() + date.getTimezoneOffset() * 60 * 1000
    ); // Fix date even on different timezones
    return format(new Date(fixedDate), "YYY/MM/dd");
  }

  function handleChange(
    key: keyof IData,
    event: React.ChangeEvent<{ value: string }>
  ): void {
    const newFilter = { ...filter };
    newFilter[key as keyof IData] =
      key === "date" ? formatDate(event.target.value) : event.target.value;
    setList([...data]);

    setFilter({ ...newFilter });
    filterList();
  }

  const filterList = useCallback((): void => {
    const keys = Object.keys(filter) as Array<keyof IData>;
    let newList: IData[] = [...data];

    keys.forEach((key: keyof IData) => {
      if (filter[key]) {
        newList = newList.filter((item: IData) => item[key] === filter[key]);
      }
    });
    setList([...newList]);
  }, [filter]);

  useEffect(() => {
    filterList();
  }, [filter, filterList]);

  function setListInitialValue(): void {
    setList({ ...data });
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
