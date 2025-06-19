import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import classNames from 'classnames';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

interface Props1 {
  perPage: number;
  pageNumber: number;
}

interface Props2 extends Props1 {
  itemsList: string[];
}

const perPageOptions = [3, 5, 10, 20] as const;

type PerPage = (typeof perPageOptions)[number];

function getPageItems(
  itemsList: string[],
  { perPage, pageNumber }: Props1,
): string[] {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const firstElementId = (pageNumber - 1) * perPage;
  const lastElementId =
    pageNumber < maxPages ? firstElementId + perPage - 1 : itemsList.length;

  return [...itemsList].slice(firstElementId, lastElementId + 1);
}

// const Pagination = () => {};

// const PaginationElement = (pageNumber: number) => ();

const Info = ({ itemsList, perPage, pageNumber }: Props2) => {
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

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value as PerPage);
              setMaxPagesCount(Math.ceil(items.length / perPage));
            }}
          >
            {perPageOptions.map(option => {
              return (
                <option
                  value={option}
                  key={option}
                  selected={option === perPage}
                >
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

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: pageNumber === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={pageNumber === 1}
            onClick={() => {
              setPageNumber(currentPageNumber => currentPageNumber - 1);
            }}
          >
            «
          </a>
        </li>
        {/* <PaginationElement /> */}
        {getNumbers(1, maxPagesCount).map(n => (
          <li
            className={classNames('page-item', { active: n === pageNumber })}
            key={`page_${n}`}
            onClick={() => {
              setPageNumber(n);
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${n}`}>
              {n}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: pageNumber === maxPagesCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={pageNumber === maxPagesCount}
            onClick={() => {
              setPageNumber(currentPageNumber => currentPageNumber + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {paginatedItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
