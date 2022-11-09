import { IRequest } from "../types/Service";

export const generateParams = ({
  limit,
  page,
  searchColumn,
  sort,
  sortColumn,
  type,
  value,
}: IRequest): string => {
  return `/api?limit=${limit}&page=${page}&sort=${sort}&sortColumn=${sortColumn}&searchColumn=${searchColumn}&type=${type}&value=${value}`;
};
