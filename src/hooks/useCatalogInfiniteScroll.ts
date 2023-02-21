import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCatalogQuery } from "../app/services/shopApi";
import { addCatalogData, selectCatalog, setCatalogData } from "../app/services/catalog/catalogSlice";

interface useInfiniteScrollProps {
  offset: number
};

export default function useCatalogInfiniteScroll({offset}: useInfiniteScrollProps) {
  const dispatch = useDispatch();
  const { activeCategoryID, data: catalogData, lastLoadedItemCount, searchParam } = useSelector(selectCatalog);
  const { data, ...rest } = useGetCatalogQuery({offset, categoryId: activeCategoryID, q: searchParam});

  useEffect(() => {
    if (data) {
      if (offset === 0) {
        dispatch(setCatalogData({data}));
      } else {
        dispatch(addCatalogData({data}));
      };
    };
  }, [data, offset, dispatch]);

  return {data: catalogData, lastLoadedItemCount, ...rest};
};