import React from "react";

import axios from "../axios";
import { IRequest, ISuccess } from "../types/Service";
import { ITableData } from "../types/Table";
import { generateParams } from "../utils";

export const url = "http://localhost:4444";

export const useService = (data: IRequest) => {
  const [max, setMax] = React.useState<number>(0);
  const [rows, setRows] = React.useState<ITableData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const request = React.useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<ISuccess>(generateParams(data));

      if (response.data) {
        setMax(response.data.max);
        setRows(response.data.rows);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  React.useEffect(() => {
    request();
  }, [data, request]);

  return {
    // столбцы
    rows,
    // загрузка данных
    isLoading,
    // Максимальное число столбцов
    max,
  };
};
