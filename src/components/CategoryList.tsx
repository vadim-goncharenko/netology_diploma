import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryListQuery } from "../app/services/shopApi";
import { selectActiveCategoryID, setActiveCategory } from "../app/services/catalog/catalogSlice";
//import { actionSetActiveCategory, selectActiveCategoryID } from "../features/category/categorySlice";
import CategoryItem from "./CategoryItem";
import Error from "./Error";

export default function CategoryList() {
  const activeCategoryID = useSelector(selectActiveCategoryID);
  console.log('CategoryList', activeCategoryID);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetCategoryListQuery();
  if (data === null) return null;

  return (
    <>
      { error && <Error message="Ошибка получения категорий" refetch={refetch} isLoading={isLoading} /> }
      <ul className="catalog-categories nav justify-content-center">
        {data?.map(item =>
          <CategoryItem
            title={ item?.title }
            key={ item.id }
            isActive={ item.id === activeCategoryID }
            onClick={ () => dispatch(setActiveCategory({activeCategoryID: item.id})) }
            />
        )}
      </ul>
    </>
  );
};