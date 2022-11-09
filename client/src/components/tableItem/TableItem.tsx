import React from "react";

import { ITableData } from "../../types/Table";

interface ITableItemComponent {
  item: ITableData;
}

export const TableItem: React.FC<ITableItemComponent> = React.memo(
  ({ item }) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.distance}</td>
        <td>{item.date.split("T")[0]}</td>
      </tr>
    );
  }
);
