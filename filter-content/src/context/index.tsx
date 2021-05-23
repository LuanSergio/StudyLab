import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { format } from "date-fns";
import { data } from "../data/data";

interface ContextData {
  data: IData[];
  list: IData[];
  handleChange: (
    key: keyof IData,
    event: React.ChangeEvent<{ value: string }>
  ) => void;
}

type ContextProviderProps = {
  children: ReactNode;
};

export const FilterContext = createContext({} as ContextData);

export function FilterContextProvider({ children }: ContextProviderProps) {
  const [list, setList] = useState<IData[]>([...data]);
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    color: "",
    date: "",
  });

  const formatDate = (value: string): string => {
    const date = new Date(value);
    const fixedDate = new Date(
      date.valueOf() + date.getTimezoneOffset() * 60 * 1000
    ); // Fix date even on different timezones
    return format(new Date(fixedDate), "YYY/MM/dd");
  };

  const handleChange = (
    key: keyof IData,
    event: React.ChangeEvent<{ value: string }>
  ): void => {
    const newFilter = { ...filter };
    newFilter[key as keyof IData] =
      key === "date" ? formatDate(event.target.value) : event.target.value;
    setFilter({ ...newFilter });
    setList([...data]);
  };

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

  return (
    <FilterContext.Provider
      value={{
        data,
        list,
        handleChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  return useContext(FilterContext);
};
