import React from 'react';

import { IPagination } from '../../types/Pagination';

interface PropsComponent {
  pagination: IPagination[];
  paginationClick: (value: number) => void;
}

export const PaginationList: React.FC<PropsComponent> = ({
  pagination,
  paginationClick,
}) => {
  return (
    <ul className="pagination">
      {pagination &&
        pagination.map((i) => (
          <li
            onClick={() => paginationClick(i.value)}
            key={i.value}
            className={["pagination__item", i.active && "active"].join(" ")}
          >
            {i.value}
          </li>
        ))}
    </ul>
  );
};
