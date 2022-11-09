import { Table } from "../models/table.js";

import { Router } from "express";
import { onlySearch, onlySort, searchAndSort } from "../utils/Table.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { sort, sortColumn, searchColumn, type, value, limit, page } =
      req.query;

    // опеределяем, если страница 1, то пропускать не нужно
    const skip = page == 1 ? 0 : limit * (page - 1);

    if (sortColumn && !value) {
      return onlySort(skip, limit, sortColumn, sort, res);
    }

    if (!sortColumn && value) {
      return onlySearch(skip, limit, searchColumn, type, value, res);
    }

    if (sortColumn && value) {
      return searchAndSort(
        skip,
        limit,
        sortColumn,
        sort,
        searchColumn,
        type,
        value,
        res
      );
    }

    // get
    const rows = await Table.find({}, {}, { skip: skip, limit: limit });

    const maxRows = await Table.find();

    res.status(200).json({ rows, max: maxRows.length });
  } catch (error) {
    console.log(error);
  }
});

export default router;
