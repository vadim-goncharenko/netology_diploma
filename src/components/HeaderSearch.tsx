import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { searchCatalog, selectCatalogSearchText, setCatalogSearchText } from "../app/services/catalog/catalogSlice";

const catalogLink = '/catalog';

export default function HeaderSearch() {
  const dispatch = useDispatch();
  const catalogSearch: string = useSelector(selectCatalogSearchText);
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHidden) {
      inputRef?.current?.focus();
    }
  }, [isHidden]);

  // expand search
  const handleClick = () => {
    inputRef?.current?.focus();
    setIsHidden(!isHidden);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = e.currentTarget["search"].value;
    if (searchText === '') { // user entered nothing
      console.log('empty');
      setIsHidden(true);
    } else { // start search
      navigate(catalogLink);
      dispatch(searchCatalog());
    };
  };

  return (
    <>
      <div id="search-expander" className="header-controls-pic header-controls-search" onClick = { handleClick } />
      <form
        id="search-form"
        className={ classNames("header-controls-search-form", "form-inline", { "invisible": isHidden }) }
        onSubmit={ handleSubmit }
        >
        <input
          className="form-control"
          placeholder="Поиск"
          ref={ inputRef }
          name="search"
          value={ catalogSearch }
          onChange={ (e) => dispatch(setCatalogSearchText({search: e.target.value})) }
          />
      </form>
    </>
  );
};