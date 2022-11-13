import s from "./searchBar.module.scss";
import { useEffect, useState } from "react";
import { setSortParams } from "../../redux/kitties/kitties-slice";
import { useDispatch } from "react-redux";

const SearchBar = ({ handleSort }) => {
  const [SortValues, setSortValues] = useState({
    sort_by: "id",
    desc: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortParams(SortValues));
  }, [dispatch, SortValues]);

  const handleOrderChange = () => {
    setSortValues({ ...SortValues, desc: !SortValues.desc });
  };

  const handSortParamChange = (e) => {
    setSortValues({ ...SortValues, sort_by: e.target.value });
  };
  return (
    <header className={s.Searchbar}>
      <div className={s.formContainer}>
        <label className={s.SortLabel} htmlFor="cats">
          Filter by:
          <select
            className={s.SortSelect}
            onChange={handSortParamChange}
            name="cats"
            id="cats"
          >
            <option value="id">Default order</option>
            <option value="name">Name</option>
            <option value="category">Kittiegory</option>
            <option value="price">Price</option>
          </select>
        </label>
        <label className={s.reverseOrderLabel}>
          Reverse Order:
          <input
            className={s.reverseOrderInput}
            type="radio"
            checked={SortValues.desc}
            onChange={() => {
              "I`m not working because... because fuck you, that`s why";
            }}
            onClick={handleOrderChange}
          />
        </label>
      </div>
    </header>
  );
};

export default SearchBar;
