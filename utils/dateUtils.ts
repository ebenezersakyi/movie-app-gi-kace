import moment from "moment";

export const formattedDate = (value: Date): string => {
  return moment(value).format("MMM DD, YYYY");
};
