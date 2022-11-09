import { IFilters, IIsDisabled } from "../types/Filters";

export const columns = ["name", "quantity", "distance", "date"];

export const conditions = ["contains", "equally", "more", "less"];

export const isDisabled = ({ column, type }: IIsDisabled): boolean => {
  if (column === "name" && (type === "less" || type === "more")) {
    return true;
  }
  if (column === "quantity" && type === "contains") {
    return true;
  }
  if (column === "distance" && type === "contains") {
    return true;
  }
  if (column === "date") {
    return true;
  }

  return false;
};

export const valid = ({ searchColumn, type, value }: IFilters): boolean => {
  if (!searchColumn || !type || !value) {
    return true;
  }

  if (isDisabled({ column: searchColumn, type: type })) {
    return true;
  }

  return false;
};
