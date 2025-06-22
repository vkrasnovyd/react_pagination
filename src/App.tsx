import classNames from 'classnames';
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

interface PageItemsProps {
  perPage: number;
  pageNumber: number;
}

interface PageItemsInfoProps extends PageItemsProps {
  itemsList: string[];
}

interface PaginationProps {
  pageNumber: number;
  maxPagesCount: number;
  onClick: (newValue: number) => void;
}

const perPageOptions = [3, 5, 10, 20] as const;

type PerPage = (typeof perPageOptions)[number];

interface PerPageSelectorProps {
  itemsList: string[];
  perPage: number;
  perPageSetter: (newValue: PerPage) => void;
  maxPagesSetter: (newValue: number) => void;
  pageNumberSetter: (newValue: number) => void;
}

function getPageItems(
  itemsList: string[],
  { perPage, pageNumber }: PageItemsProps,
): string[] {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const firstElementId = (pageNumber - 1) * perPage;
  const lastElementId =
    pageNumber < maxPages ? firstElementId + perPage - 1 : itemsList.length;

  return [...itemsList].slice(firstElementId, lastElementId + 1);
}

const Pagination = ({
  pageNumber,
  maxPagesCount,
  onClick,
}: PaginationProps) => {
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === maxPagesCount;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onClick(pageNumber - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, maxPagesCount).map(n => (
        <li
          className={classNames('page-item', { active: n === pageNumber })}
          key={`page_${n}`}
          onClick={() => {
            onClick(n);
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${n}`}>
            {n}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onClick(pageNumber + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

const Info = ({ itemsList, perPage, pageNumber }: PageItemsInfoProps) => {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const normlizedPageNumber = Math.max(1, Math.min(pageNumber, maxPages));
  const firstElementId = (normlizedPageNumber - 1) * perPage + 1;
  const lastElementId =
    normlizedPageNumber < maxPages
      ? firstElementId + perPage - 1
      : itemsList.length;
  const infoString = `Page ${normlizedPageNumber} (items ${firstElementId} - ${lastElementId} of ${itemsList.length})`;

  return (
    <p className="lead" data-cy="info">
      {infoString}
    </p>
  );
};

const PerPageSelector = ({
  itemsList,
  perPage,
  perPageSetter,
  maxPagesSetter,
  pageNumberSetter,
}: PerPageSelectorProps) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        onChange={event => {
          const newPerPageValue = (e: React.ChangeEvent<HTMLSelectElement>) =>
            +e.target.value as PerPage;

          perPageSetter(newPerPageValue(event));
          maxPagesSetter(Math.ceil(itemsList.length / newPerPageValue(event)));
          pageNumberSetter(1);
        }}
      >
        {perPageOptions.map((option: PerPage) => {
          return (
            <option value={option} key={option} selected={option === perPage}>
              {option}
            </option>
          );
        })}
      </select>
    </div>

    <label htmlFor="perPageSelector" className="col-form-label col">
      items per page
    </label>
  </div>
);

const PageItems = ({ itemsList }: { itemsList: string[] }) => (
  <ul>
    {itemsList.map(item => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPage>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [maxPagesCount, setMaxPagesCount] = useState<number>(
    Math.ceil(items.length / perPage),
  );
  const paginatedItems = getPageItems(items, { perPage, pageNumber });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <Info itemsList={items} perPage={perPage} pageNumber={pageNumber} />
      <PerPageSelector
        itemsList={items}
        perPage={perPage}
        perPageSetter={setPerPage}
        maxPagesSetter={setMaxPagesCount}
        pageNumberSetter={setPageNumber}
      />
      <Pagination
        pageNumber={pageNumber}
        maxPagesCount={maxPagesCount}
        onClick={setPageNumber}
      />
      <PageItems itemsList={paginatedItems} />
    </div>
  );
};

export default App;
