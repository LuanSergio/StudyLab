import { format } from "date-fns";

export const formatDate = (value: string): string => {
  const date = new Date(value);
  const fixedDate = new Date(
    date.valueOf() + date.getTimezoneOffset() * 60 * 1000
  ); // Fix date even on different timezones
  return format(new Date(fixedDate), "YYY/MM/dd");
};
