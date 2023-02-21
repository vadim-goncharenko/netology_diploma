import React from "react"
import CatalogItem from "./CatalogItem";
import Error from "./Error";
import Loader from "./Loader";
import LoadMore from "./LoadMore";
import { CatalogItem as CatalogItemType } from "../types/types";
import useCatalogInfiniteScroll from "../hooks/useCatalogInfiniteScroll";
import { increaseCatalogOffset, selectCatalogOffset } from "../app/services/catalog/catalogSlice";
import { useDispatch, useSelector } from "react-redux";

interface CatalogProps {
  children: React.ReactNode
};

export default function Catalog({ children }: CatalogProps) {
  const loadMoreCount = 6;
  const dispatch = useDispatch();
  const offset = useSelector(selectCatalogOffset);
  const { data, error, isLoading, isFetching, refetch, lastLoadedItemCount } = useCatalogInfiniteScroll({ offset });

  return (
    <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    { error && <Error message="Ошибка получения каталога" refetch={refetch} isLoading={isLoading} /> }
    { children }
    { data &&
      <>
        <div className="row">
          { data?.map((item:CatalogItemType) => <CatalogItem item={item} key={item.id} />) }
        </div>
        { !isFetching && loadMoreCount && loadMoreCount === lastLoadedItemCount && <LoadMore onClick={() => dispatch(increaseCatalogOffset({loadMoreCount}))} /> }
        <Loader isLoading={isFetching} />
      </>
    }
  </section>
  );
};