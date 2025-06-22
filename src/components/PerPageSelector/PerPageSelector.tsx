import { PerPage, perPageOptions } from '../../types/PerPage';

interface Props {
  itemsList: string[];
  perPage: number;
  perPageSetter: (newValue: PerPage) => void;
  maxPagesSetter: (newValue: number) => void;
  pageNumberSetter: (newValue: number) => void;
}

export const PerPageSelector = ({
  itemsList,
  perPage,
  perPageSetter,
  maxPagesSetter,
  pageNumberSetter,
}: Props) => (
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
