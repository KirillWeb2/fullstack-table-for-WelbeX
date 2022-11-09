import React from 'react';

import { ServiceContext } from '../../context/Service';
import { IPagination } from '../../types/Pagination';
import { IRequest } from '../../types/Service';
import { getPagination } from '../../utils/Pagination';
import { Button } from '../UI/Button';
import { PaginationList } from './PaginationList';

interface IPaginationComponent {
  max: number;
}

export const Pagination: React.FC<IPaginationComponent> = React.memo(
  ({ max }) => {
    const { query, setQuery } = React.useContext(ServiceContext);

    // массив объектов
    const [pagination, setPagination] = React.useState<IPagination[]>([]);

    const createPagination = React.useCallback(
      (query: IRequest) => {
        const pagination: IPagination[] = getPagination(query.page, max);

        setPagination(pagination);
      },
      [max]
    );

    const back = () => {
      if (query.page === 1) return;

      setQuery({ ...query, page: query.page - 1 });
    };

    const forward = () => {
      if (query.page * query.limit >= max) return;

      setQuery({ ...query, page: query.page + 1 });
    };

    // мгновенный переход на страницу
    const paginationClick = React.useCallback(
      (page: number) => setQuery({ ...query, page: page }),
      []
    );

    React.useEffect(() => {
      // следит за актуальным телом запроса и генерирует актуальную пагинацию
      if (query) createPagination(query);
    }, [query, createPagination]);

    return (
      <div className="pagination">
        <Button onClick={back}>Back</Button>

        <PaginationList
          pagination={pagination}
          paginationClick={paginationClick}
        />

        <Button onClick={forward}>Forward</Button>
      </div>
    );
  }
);
