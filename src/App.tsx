import React, { useState } from 'react';

import './App.css';

import { getNumbers, getPageItems } from './utils';
import { Info } from './components/Info';
import { PageItems } from './components/PageItems';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { PerPage } from './types/PerPage';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

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
