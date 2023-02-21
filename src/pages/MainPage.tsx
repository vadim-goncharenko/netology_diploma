import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import Catalog from "../components/Catalog";
import TopSales from "../components/TopSales";

export default function Main() {

  return (
    <>
      <Banner />
      <TopSales />
      <Catalog>
        <CategoryList />
      </Catalog>
    </>
  );
};

