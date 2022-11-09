import { Table } from "../models/table.js";

export const generateFilter = (column, type, value) => {
  // генерация объекта фильтрации на основе приходящих данных

  switch (column) {
    case "name":
      switch (type) {
        case "equally":
          return { name: { $eq: value } };
        case "contains":
          return { name: { $in: new RegExp(value, "gi") } };
        default:
          return;
      }
    case "quantity":
      switch (type) {
        case "more":
          return { quantity: { $gt: +value } };
        case "less":
          return { quantity: { $lt: +value } };
        case "equally":
          return { quantity: { $eq: +value } };
        default:
          return;
      }
    case "distance":
      switch (type) {
        case "more":
          return { distance: { $gt: +value } };
        case "less":
          return { distance: { $lt: +value } };
        case "equally":
          return { distance: { $eq: +value } };
        default:
          return;
      }
    default:
      return;
  }
};

export const generateSort = (sortColumn, sort) => {
  // генерация объекта сортировки на основе приходящих данных

  const sorted = {};

  sorted[sortColumn] = sort == "asc" ? 1 : -1;

  return sorted;
};

export const onlySort = async (skip, limit, sortColumn, sort, res) => {
  // функция сортировки

  const maxRows = await Table.find();

  // ничего особенного, задаём лимит, сколько нужно пропустить и сортируем полученное
  const rows = await Table.find({}, {}, { skip: skip, limit: limit }).sort(
    generateSort(sortColumn, sort)
  );

  return res.status(200).json({ rows, max: maxRows.length });
};

export const onlySearch = async (
  skip,
  limit,
  searchColumn,
  type,
  value,
  res
) => {
  const maxRows = await Table.find(
    generateFilter(searchColumn, type, value),
    {}
  );

  const rows = await Table.find(
    generateFilter(searchColumn, type, value),
    {},
    { skip: skip, limit: limit }
  );

  return res.status(200).json({ rows, max: maxRows.length });
};

export const searchAndSort = async (
  skip,
  limit,
  sortColumn,
  sort,
  searchColumn,
  type,
  value,
  res
) => {
  const rows = await Table.find(
    generateFilter(searchColumn, type, value),
    {},
    { skip: skip, limit: limit }
  ).sort(generateSort(sortColumn, sort));

  const maxRows = await Table.find(
    generateFilter(searchColumn, type, value),
    {}
  );

  return res.status(200).json({ rows, max: maxRows.length });
};
