import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './App.css';

import { getNumbers, getPageItems } from './utils';
import { Info } from './components/Info';
import { PageItems } from './components/PageItems';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { PerPage, perPageOptions } from './types/PerPage';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParamRaw = parseInt(searchParams.get('perPage') || '5', 10);
  const pageNumberParamRaw = parseInt(searchParams.get('page') || '1', 10);

  const perPageParam = perPageOptions.includes(perPageParamRaw as PerPage)
    ? (perPageParamRaw as PerPage)
    : 5;
  const [maxPagesCount, setMaxPagesCount] = useState<number>(
    Math.ceil(items.length / perPageParam),
  );
  const pageNumberParam = Math.max(
    1,
    Math.min(pageNumberParamRaw, maxPagesCount),
  );

  const [perPage, setPerPage] = useState<PerPage>(perPageParam);
  const [pageNumber, setPageNumber] = useState<number>(pageNumberParam);

  const paginatedItems = getPageItems(items, { perPage, pageNumber });

  useEffect(() => {
    setSearchParams({ perPage: String(perPage), page: String(pageNumber) });
  }, [pageNumber, perPage, setSearchParams]);

  useEffect(() => {
    setMaxPagesCount(Math.ceil(items.length / perPage));
  }, [perPage]);

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
