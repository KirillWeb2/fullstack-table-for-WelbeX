import React from "react";

import { ServiceContext } from "../../context/Service";
import { IFilters } from "../../types/Filters";
import { columns, conditions, valid } from "../../utils";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";

interface IFilteringComponent {
  isLoading: boolean;
}

export const Filtering: React.FC<IFilteringComponent> = React.memo(
  ({ isLoading }) => {
    const { query, setQuery } = React.useContext(ServiceContext);

    const [filters, setFilters] = React.useState<IFilters>({
      searchColumn: "",
      type: "",
      value: "",
    });

    // если все поля заполнены

    const searchSubmit = () =>
      setQuery({
        ...query,
        searchColumn: filters.searchColumn as "",
        type: filters.type as "",
        value: filters.value,
      });

    const reset = () => {
      setFilters({
        searchColumn: "",
        type: "",
        value: "",
      });
      setQuery({
        ...query,
        searchColumn: "",
        type: "",
        value: "",
      });
    };

    return (
      <div className="filtering">
        {isLoading && <div className="filtering__loading">Loading...</div>}
        <div className="filters">
          <Select
            columns={columns}
            value={filters.searchColumn}
            onChange={(e) =>
              setFilters({ ...filters, searchColumn: e.target.value })
            }
          />
          <Select
            columns={conditions}
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
          <input
            className="filters__input"
            type="text"
            placeholder="Search value"
            value={filters.value}
            onChange={(e) => setFilters({ ...filters, value: e.target.value })}
          />
          <Button
            className="filters__btn"
            onClick={searchSubmit}
            disabled={valid({ ...filters })}
          >
            Search
          </Button>
          <Button className="filters__btn" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
);
