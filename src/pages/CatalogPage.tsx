import Banner from "../components/Banner";
import Catalog from "../components/Catalog";
import CatalogSearch from "../components/CatalogSearch";
import CategoryList from "../components/CategoryList";

export default function CatalogPage() {

  return (
    <>
      <Banner />
      <Catalog>
        <CategoryList />
        <CatalogSearch />
      </Catalog>
    </>
  );
};