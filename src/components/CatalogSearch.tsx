import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectCatalogSearchText, searchCatalog, setCatalogSearchText } from "../app/services/catalog/catalogSlice";

export default function CatalogSearch() {
  const dispatch = useDispatch();
  const catalogSearch: string = useSelector(selectCatalogSearchText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchCatalog());
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={ handleSubmit }>
      <input
        type="search"
        name="search"
        className="form-control"
        placeholder="Поиск"
        value={ catalogSearch }
        onChange={ (e) => dispatch(setCatalogSearchText({search: e.target.value})) }
        />
    </form>
  );
};