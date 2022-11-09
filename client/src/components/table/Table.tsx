import React from 'react';

import { ServiceContext } from '../../context/Service';
import { IHeader, ITableData } from '../../types/Table';
import { TableItem } from '../tableItem/TableItem';

interface ITableComponent {
  rows: ITableData[];
}

export const Table: React.FC<ITableComponent> = React.memo(({ rows }) => {
  const { query, setQuery } = React.useContext(ServiceContext);

  const [headers, setHeaders] = React.useState<IHeader[]>([
    { type: "", value: "name" },
    { type: "", value: "quantity" },
    { type: "", value: "distance" },
    { type: "", value: "date" },
  ]);

  const sort = (column: IHeader) => {
    if (column.value === "date") return;

    // это состояние служит, для определения стадии сортировки (По возрастанию или убыванию)
    setHeaders(
      headers.map((i) =>
        i.value === column.value
          ? { ...i, type: i.type === "asc" ? "desc" : "asc" }
          : i
      )
    );

    setQuery({
      ...query,
      sort: column.type === "asc" ? "desc" : "asc",
      sortColumn: column.value,
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((i) => (
            <th key={i.value} onClick={() => sort(i)}>
              {i.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((i) => (
          <TableItem key={i._id} item={i} />
        ))}
      </tbody>
    </table>
  );
});
